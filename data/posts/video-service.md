## Context

The demand to bring videos to our platform was driven by new prospects who, for
compliance reasons, could not post internal videos on platforms like YouTube and
Vimeo. This prompted us to explore ways to host and deliver these videos securely
while providing an easy and scalable solution.

## Problem

Initially, we considered developing the entire infrastructure ourselves by leveraging
the power of `ffmpeg`. However, we soon realized that we would need to handle:

- Encoding in multiple formats to support various devices;
- Generating manifest files;
- Delivering content at the edge;

Building and maintaining this complex pipeline internally would have been costly
and time-consuming. Therefore, we decided to look for external services that could
provide video streaming, storage, and delivery at a reasonable price.

## Solution

After evaluating several services based on pricing and quality, we chose
[Cloudflare Streams](https://www.cloudflare.com/developer-platform/products/cloudflare-stream/).
It offered straightforward, pay-as-you-go pricing without hidden fees:

- Minutes of videos stored: USD 5 per 1,000 minutes
- Minutes of videos delivered: USD 1 per 1,000 minutes

Additionally, Cloudflare Streams supports private video hosting with token-based
access. Generating a token and attaching it to the URL is all that's required to
grant or restrict access.

To maintain flexibility (e.g., changing providers in the future or handling outages),
we designed a process that operates as follows:

### Step 1 - Users upload videos directly to a bucket

Videos can be very large, and our users' upload speeds vary. Since servers can
be scaled down at any time, sending files directly to a cloud storage bucket
ensures uploads are reliable. Most cloud providers offer virtually unlimited
storage and can handle a 25 GB upload that takes two hours without issues.
We simply generate a signed request that the browser uses to upload the file.

### Step 2 - Video processing

Once the video is uploaded, the cloud provider drops a message into a Pub/Sub
topic. We have a subscription that triggers a call to our API, notifying us
that the file is ready for Cloudflare processing. After authenticating the Pub/Sub
call, our API checks the file (size and other validations). If all is well, we
sign a read link to the file and invoke Cloudflare's API so it can download and
process the video.

This setup is also resilient, if our API fails, the Pub/Sub subscription automatically
retries with an exponential backoff. In the worst case, the message goes to a
dead-letter queue for later inspection.

### Step 3 - Video is ready

After Cloudflare finishes processing, it sends us a webhook call. We then make
the video available to our customers for use anywhere in our application.

## Takeaway

Developing a scalable solution to host videos from ground up would require a lot
of effort and would deviate the focus of the team from the existing product to a
new offering that was not part of the business goals of the organization. Using
a 3rd-party was then a great option, however it's important to be able to switch
solutions without ever requiring the users to re-upload content. The design choices
ensured that we met all stake-holders requirements at a reasonable price and time.
