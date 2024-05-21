use sha2::{Digest, Sha256};
use std::mem::MaybeUninit;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub trait ArrayCollect {
    type Item;

    fn collect_array<const L: usize>(self) -> [Self::Item; L];
}

struct PartialArray<T, const N: usize> {
    initialized_length: usize,
    array: [MaybeUninit<T>; N],
}

impl<T, const N: usize> PartialArray<T, N> {
    fn new() -> Self {
        Self {
            initialized_length: 0,
            // See: https://doc.rust-lang.org/nomicon/unchecked-uninit.html
            array: unsafe { MaybeUninit::<[MaybeUninit<T>; N]>::uninit().assume_init() },
        }
    }

    fn initialize(&mut self, t: T) {
        assert!(self.initialized_length < N);
        // This doesn't cause the previous T element to be dropped as if it was initialized, as the
        // assigment of MaybeUninit<T>'s instead of T's
        self.array[self.initialized_length] = MaybeUninit::new(t);
        self.initialized_length += 1;
    }

    fn into_array(mut self) -> [T; N] {
        assert_eq!(N, self.initialized_length);
        assert_eq!(
            core::mem::size_of::<[T; N]>(),
            core::mem::size_of::<[MaybeUninit<T>; N]>()
        );
        // Don't drop the copied elements when PartialArray is dropped
        self.initialized_length = 0;
        unsafe { core::mem::transmute_copy::<_, [T; N]>(&self.array) }
    }
}

impl<T, const N: usize> Drop for PartialArray<T, N> {
    fn drop(&mut self) {
        for i in 0..self.initialized_length {
            unsafe {
                self.array[i].assume_init_drop();
            }
        }
    }
}

impl<It: Iterator<Item = Item>, Item> ArrayCollect for It {
    type Item = It::Item;

    fn collect_array<const L: usize>(self) -> [Self::Item; L] {
        let mut partial_array = PartialArray::<Self::Item, L>::new();

        for item in self {
            partial_array.initialize(item);
        }

        partial_array.into_array()
    }
}

pub trait SliceToArray {
    type Item: Copy;

    fn as_array<const L: usize>(&self) -> [Self::Item; L];
}

impl<Item: Copy> SliceToArray for [Item] {
    type Item = Item;

    fn as_array<const L: usize>(&self) -> [Self::Item; L] {
        self.iter().copied().collect_array::<L>()
    }
}

pub fn sha2_256(input: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(input);
    let result = hasher.finalize();
    result.as_slice().as_array()
}
