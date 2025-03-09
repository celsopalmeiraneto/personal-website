## Context

One of the most common type of tasks I've found in my career is systems integrations.
From my first job at Servinn to MobieTrain, I always had to ensure two (sometimes three, even four)
systems communicated and data was synced between those.

Those integrations should not only move data between systems but also apply some specific business rules.
For instance, some users should have access removed from a given platform when they are on vacations,
or a client that uses a POS (Point of Sale) software from a 3rd Party still wants to use the Credit
Card conciliation process we developed.

In the end we should also notify someone or something that the process has finished, deliver a
file somewhere with all results, be it an FTP server or a bucket, send an email to the person in
charge for the integration notifying of issues.

## Problem

Often we may have an educated guess on how much data is going to be received by the integration,
but in reality, that's completely out of the control of the integration developers, and that's a
challenge. It's a challenge because the way one implement the integration, large amounts of data can end up
in memory, causing all sorts of issues.

Mainly on file based integrations, I often see developers read a file into memory so that they can
break it up in lines, then parse those lines and so on. While it definitely is going to work for
a couple hundred lines, that can only go so far.

How to cover for those issues?

## Solution

Steams, Pipelines and Iterators.

Let's say you have been tasked to develop the following integration:

> Every day, you should download a CSV from an FTP with latest employee data from the HR system,
> create or update the user in our system, then, summarize the process and send as an email to the HR
> manager.

This is a large company with a couple thousand employees, each employee (a line in our CSV), has
15 attributes that must be processed, we are now talking about a file that may not be the best fit
for the server you have at hand.

### Breaking down the process

```
flowchart LR
  Start@{ shape: circle, label: "Start" } --> GetFile
  GetFile[Get file from FTP] --> ReadLine
  ReadLine --> HasLine{Has line?}
  HasLine -->|Yes| IsLineValid{Is valid line?}
  HasLine -->|No| SendSummary[Send Summary]
  SendSummary --> End@{ shape: dbl-circ, label: "End" }
  IsLineValid --> |Yes| CheckEmployeeExists{Does Employee exist?}
  IsLineValid --> |No| RegisterFailure[Register Failure]
  CheckEmployeeExists -->|Yes| UpdateEmployee[Update Employee]
  CheckEmployeeExists -->|No| CreateEmployee[Create Employee]
  UpdateEmployee --> DidEmployeeWriteSucceed{Successful Operation?}
  CreateEmployee --> DidEmployeeWriteSucceed
  DidEmployeeWriteSucceed -->|No| RegisterFailure
  DidEmployeeWriteSucceed -->|Yes| ReadLine
```

Let's get started with solving for the problem with a familiar solution, the `for...of` loop.
One, then, may say: "`for...of`??? Are we loading all items in memory? The answer is: no.
The `for...of` loop iterates over any [Iterable Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol).

#### Steams Implementation - Validating the Lines

```ts

class Validator extends Transform {
  transform(chunk) {
    isChunkLine() {

    }

    if (!this.isChunkALine(chunk)) {

    }
  }
}
```
