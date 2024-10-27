_This blog post was written partially at my work hours at [MobieTrain](https://mobietrain.com) to share my view on PR evaluations with my colleagues. I had approval from the leadership team on sharing this article on my personal blog._

## Code is written for humans

Before getting into the actual technical intricacies of PRs (Pull Request) we have to always remind ourselves that code is only written for people, and people have their quirks and idiosyncrasies.

As much as one say that they detach their code from themselves, PR evaluations can and, unfortunately are taken personally, as someone is commenting on the output of one's work and criticizing what brings money to their homes and provide sustenance to their family.

Even though I wouldn't bring up the late [George Carlin](https://en.wikipedia.org/wiki/George_Carlin) in a professional conversation, I really like this quote from one of his stand-up comedy shows:

> Have you ever noticed that anybody driving slower than you is an idiot, and anyone going faster than you is a maniac?

We should not allow ourselves to be in that mindset while reviewing a PR, as it demonstrate lack of empathy. We should try to set aside matters of personal taste and how we would like the codebase to look like, but stick to the feature we are working on, the current conventions and the zeitgeist of the team. We should remember that another fellow human has written the code.

## The Goals of a PR evaluation

PRs serve the purpose of ensuring that a given changeset is:

1. In-line with the feature or fix it is related to;
2. Free of semantic issues that may cause bugs or deviations from business rules;
3. In-line with the team's code standards;
4. Readable and maintainable by fellow humans.

We should focus on the aspects that automation cannot look into. If something should have been warned by the linter / prettier / CI (Continuous Integration) we should not bother Individual Contributors. We either change our processes or we move on.

### Scope

We should refrain from asking for changes that are out of the scope of the task in question.

That doesn't mean we are not supposed to raise flags if, while evaluating, we find out a related issue that can be tackled. Those discussions are welcome and enriching, the decision to actually take action, then should be taken by the IC (individual contributor) having the context of the feature and work at hand.

### Readability Concerns

The focus when requesting readability changes should be on reducing cognitive load. That comes in the shape of (but not limited to):

- meaningful names;
- number of operations in a function;
- how large a piece of code is.

We should aim to have names that reflect not only semantics of the variables, constants and functions, but also the types of it. A good rule of thumb is:

> If my colleagues open this file using Nano, can they know what is a constant or a function? How easy can they infer the type of constants and variables?

That's the reason why MobieTrain has code conventions that say functions should start with verbs, variables and constants with nouns. That's why we use the suffix `at` when it's a `Date` and try to write code like:

```js
const userIsAdmin = isUserAnAdmin(user); // return is expected to be a boolean.

assertUserIsAnAdmin(user); // we expect this code to throw something if user is not an admin
```

Again, when requesting readability changes, given that we already have prettier, think of cognitive load. Always ask yourself:

> Is the change I'm asking going to decrease cognitive load? If not, I probably should not ask.

### Maintainability Concerns

We should focus on medium-long term aspects of the implementation, for instance, how easy it is to change the behavior of a piece of code and how much complexity we used to solve the issue at hand.

#### Ease to Change

On the ease to change we should observe, for instance, how many different operations a function performs. Ideally a function should do one and only thing but we know that real world require us to ensure different steps are taken in order to do something.

#### Code Reuse

We should try to reuse code as much as we can, always keeping in mind that code is a liability. Every piece of code we introduce to the codebase is bound to be maintained one day. An exception is "deprecated" code. In this case creating new code is welcome as long as we migrate as much as we can to the new code and put the deprecation notice in place.

### Code Complexity

#### Simple vs Sophisticated

There are many ways to perform the same task. Most of the times, simple code, even if it means the approach is larger or more boring, is better than a "sophisticated" approach that one has to think really hard to understand.

The issue with those "sophisticated" approaches is that they may open the door issues and bugs that are hard to reproduce and resolve.

#### Performance Optimizations

Performance optimization is one of the few reasons we rely on those approaches. We should try to find out if the gains for adding complexity to the codebase and cognitive load to the humans, out-weight its costs. In my experience, most of the times it does not. Of course, data should be the guidance.

While adding 30ms to an endpoint that is called twice a day is fine, the same change to an endpoint that called thousands or millions of times a day can be problematic. However, code optimizations that does not involve a roundtrip to external systems or handling of large datasets are seldom valuable.

## Not all PRs are equal

For different PRs we should apply slightly different semantic approaches to the work. Let's say a colleague is changing a critical component of the system in question (e.g.: authentication, authorization, a highly used feature) then we should be extra careful evaluating it and concerns like impacts on performance should be prioritized.

## Conclusion

PRs are a valuable asset for maintaining a healthy codebase, to ensure that people are on the loop in regards to what's being done and to avoid the introduction of semantic issues and deviations from business rules, however, if the team approaches PRs with the wrong mindset, the evaluations can cause all sort of friction between the team members, which brings all sorts of issues for the people, not to mention the decrease in productivity.

## Notes

_2024-10-27: I've updated the text to improve clarity as in some points I've made references to internal practices / documents that were not clear for people outside MobieTrain._
