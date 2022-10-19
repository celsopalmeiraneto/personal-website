## Context

At [MobieTrain](https://www.mobietrain.com) we serve micro-learnings to front-line employees and one important thing when teaching people is to teach the right things in the right order.

For some understandable reasons (which we can discuss in a separate post) the original developers of the solution went with a simple approach for defining the order of the content to be shown: a column called `order` on the table where the Lessons live.

The data structure resembles the following table:

| Id  | Moment | Title          | Order |
| --- | ------ | -------------- | ----: |
| 33  | 101    | Rinse the Rice |     1 |
| 44  | 101    | Boil the Water |     2 |
| 55  | 101    | Add the Rice   |     3 |
| 66  | 101    | Eat it         |     4 |

## Problem

When reviewing the performance of the Lessons and getting feedback from the Users, we sometimes decide to add a new Lesson in the middle of the existing ones, or even completely replace a Lesson with a new one.

However, we realized that under certain conditions the `order` column was not being updated correctly. After fixing the bug we also had to fix the data which looked like the following table

| Id  | Moment | Title          | Order |
| --- | ------ | -------------- | ----: |
| 44  | 101    | Boil the Water |     2 |
| 55  | 101    | Add the Rice   |     3 |
| 66  | 101    | Eat it         |     4 |

Notice the that the `order` is wrong as one Lesson was removed without recalculating the correct values.

The initial approach was to go over each of the Moments, then just iterate over the Lessons checking if the `order` was right. Below is an example implementation:

```ts
interface Lesson {
  id: number;
  order: number;
}

interface Moment {
  id: number;
}

const moments: Moment[] = await getAllMoments();
const momentsToBeFixed: number[] = [];

for (const moment of moments) {
  const lessons: Lesson[] = await getOrderedLessons(moment.id);
  const shouldBeFixed = lessons.some((lesson, index) => {
    if (lesson.order === index + 1) return false;

    return true;
  });

  if (shouldBeFixed) momentsToBeFixed.push(moment.id);
}
```

For a one-time solution we were "okay" with this approach. But performance-wise this solution was not the best one. How to improve it, though?

## Solution

Back in the school days we learnt about [Arithmetic Progressions](https://en.wikipedia.org/wiki/Arithmetic_progression), and looking at the example in the table we realize that our `order` is one of those.

Below are two examples of Arithmetic Progressions:

```
1 + 2 + 3 + 4     = 10
10 + 15 + 20 + 25 = 70
```

The first example shows that our `order` is an Arithmetic Progression with a common difference of 1.

Why not go to our SQL database and just ask: Bring me all moments with the wrong AP for order.

Below we wrote a query that compares the actual sum of existing `order`s and compare with the expected sum by using [this formula](https://en.wikipedia.org/wiki/Arithmetic_progression#Sum).

```sql
select
  moment,
  sum(`order`) as actual_sum,
  (count(id) * (1 + count(id))) / 2 as expected_sum
from
  moment m
group by
  moment
having
  actual_sum <> expected_sum
;
```

## Takeaway

In our craft, it is sometimes too easy to just use the tool at hand to solve a given problem. We must always make the effort of taking a step back, analyze the context, and ask ourselves:

"Is there another way to approach this issue?"

"Is this problem similar to other problems I've seen before?"

We may find more performant and ingenious ways for solving for those issues.
