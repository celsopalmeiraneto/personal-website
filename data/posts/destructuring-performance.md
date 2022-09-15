## Context

The other day I was asked to solve some performance issues at friend's product and got started analyzing the bottlenecks and potential issues on their codebase.

Their application was data heavy and lot's array operations was taking place all over the place. One of the most common operations were like the one you can see below:

```js
const groupItemsByWeightImmutable = (items) =>
  items.reduce((acc, item) => {
    const weight = calculateWeight(item);
    const itemsList = [...(acc[weight] ?? []), item];

    return {
      ...acc,
      [weight]: itemsList,
    };
  }, {});
```

## Problem

As you can see, the code above performs no mutation neither when adding items to the grouped arrays or when returning the accumulator to the next execution of the reducer.

It's important to point out that there is nothing wrong with the code block above. I've seen many bugs caused by some mutation deep down an object that nobody ever thought it would be changed, or some object that is used in the state of multiple components and none of the components know that their state is shared.

Back to the performance analysis, in the table below you can see the execution times for this function for various sizes of the `items` array:

| Number of Items | Execution Time (ms) |
| :-------------- | ------------------: |
| 1               |   0.198062002658844 |
| 10              | 0.24345700442790985 |
| 100             |  0.8885609954595566 |
| 1000            |  1.9857540056109428 |
| 10000           |   25.86642299592495 |
| 100000          |  269.54094099998474 |
| 1000000         |   7730.832603998482 |

The reason for the performance degradation is because we are forcing the JS engine to simply iterate over all items that have been added to a group and then iterate over all the existing groups to copy the object. This implementation knocks the door of a [quadratic function](https://en.wikipedia.org/wiki/Quadratic_time) in the worst case.

## Solution

Now let's have a look at a mutable approach for the same issue:

```js
const groupItemsByWeightMutable = (items) =>
  items.reduce((acc, item) => {
    const weight = calculateWeight(item);
    acc[weight] = acc[weight] ?? [];
    acc[weight].push(item);

    return acc;
  }, {});
```

Notice that the mutability of this implementation is contained to its own scope, meaning that it only mutates the `acc` the function has created. The performance measurements are shown below:

| Number of Items |  Execution Time (ms) |
| :-------------- | -------------------: |
| 1               |  0.04218899458646774 |
| 10              | 0.022252000868320465 |
| 100             | 0.022312000393867493 |
| 1000            |  0.12155899405479431 |
| 10000           |   1.3635540008544922 |
| 100000          |    5.004020996391773 |
| 1000000         |    49.55087600648403 |

When processing one million items we notice a 150x performance improvement.

## Takeaway

Selectively applying mutability to solve some issues can be yield performance benefits here and there. We should not just say "mutability is bad" and spend more energy and time to perform the same work. It's a matter of always analyzing the context and use the right tools for the job.
