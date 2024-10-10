### Processor Codegen

The codegen utility is very useful in times of network runtime upgrades.
In such scenarios, things can break on our end as our backends rely heavily on the events
emitted by the state-chain.
This utility was written to help us spot new events as well as changes in the schemas of the old events so to anticipate and be able to estimate/plan the work.

To be able to run the code generation tool, you first need to find out the new spec version of the network and the block hash at which it occured. Once you have these 2 pieces of information, you need to update the [configuration file](../chainspec/metadata/specVersion.json) by adding the new spec verson together with the environment, like so:

```
{
    ....,
    "170": {
        "hash": "0xd9eeefdbd275bf7466b9d76c810a7ebfb1aab16a68301ee1ab605015c7295e95",
        "network": "backspin"
    }
}
```

We just specified that we want to run the codegen for spec version "170" (1.7.0) and the upgrade occured at block hash "0xd9eeefdbd275bf7466b9d76c810a7ebfb1aab16a68301ee1ab605015c7295e95" on the backspin (our devnet) environment.

Once this is done, save the file and run the [script](./scripts/generate.ts)

```
./scripts/generate.ts
```

Voila!
