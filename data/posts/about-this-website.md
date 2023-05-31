## Context

A personal website is one of the few ways people can express themselves on the Internet without having to conform to a format conceived by someone else.

You probably are part of the billions of people that use social media, if so, in any of those platforms you post only things that are relevant to that audience (as you should). You also must adhere to the terms and conditions of the platform and the platform has control over who sees you and so on.

Those "constraints" are not issues themselves, as most of the time, they are just the rules of the game. Let's not get into the discussion (in this post) of those rules.

The point is: Having a personal website gives you the freedom to express yourself the way you want. Your design, your rules, your responsibility.

## Problem

After years of having just an "About Celso page" I also wanted to have a Blog. The question was put: What tool should I use?

Tools for building a personal website are plenty. From the good and old [WordPress](https://wordpress.com/) through [Jekyll](https://jekyllrb.com/) and [Wix](https://www.wix.com)/[Squarespace](), all of them would allow me to build a website with a couple of pages and blogging capabilities.

Apart from Jekyll, all other options would require me to work around plugins and platform limitations. Not to mention the need to host the website in a "living" server. Wix/Squarespace also brings the added issue of being products owned by private companies and therefore, they set the rules of the game.

I also had in mind a constraint: I wanted to write my blog posts in [Markdown](https://en.wikipedia.org/wiki/Markdown). I always saw Markdown as a useful tool for writing low to medium complexity texts. You focus on the content and the representation of the content is the responsibility of another component of the system. Just like good, loosely coupled systems. Jekyll got a little bit more attractive at that point.

However, there was another option, one that would allow me to use Markdown for the blog posts but the freedom to use other tools for the rest of the website. That option was combining [NextJS](https://nextjs.org/) + Markdown.

## Solution

I have always been an admirer of NextJS. It reminds me of the days when building a Web Application was as simple as connecting to an FTP and dropping in files. I do not mean to say that this is the best approach for building Web Applications. Of course, NextJS hides a ton of complexity under the hood, but still, developing software with NextJS almost always makes me smile.

Using a NextJS "exportable" website, I manage to not depend on any (traditional) server running, just dropping the files in a [S3 Bucket](https://aws.amazon.com/s3/) is enough. The website has a path called "posts" which in turn uses NextJS's `getStaticPaths` and `getStaticProps`.

The parsing of the Markdown files was done using [Marked](https://marked.js.org/), the code blocks are styled through [highlight.js](https://highlightjs.org/) (it even has a VSCode theme!!!).

## Takeaway

Personally, putting some different pieces of technology together is something that excites me a lot. I could have gone to WordPress, and I would have had a website + blog running in minutes. If my sole focus was the content, I should have gone that route. In my case, I not only wanted to have content but to build something. To explore a technology I like in unique ways.

You can find the source code for this website on [GitHub](https://github.com/celsopalmeiraneto/personal-website).
