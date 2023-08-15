# RSS-Gen

This little API can be used to generate RSS feeds, currently only for Rumble.

## How to use

1. Run it on your server (it is an ExpressJS app, you can find instructions online)
2. Fetch the name of a Rumble channel (i.e. https://rumble.com/c/{channelname} or in some cases https://rumble.com/user/{channelname})
3. Get the RSS feed by calling http://{hostname}/rumble/{channelname}

**Note:** I am already running this myself on http://rssgen.xyz, so you can use that instead of running it on your own server.\
I.e., you can get the feed by calling http://rssgen.xyz/rumble/{channelname}

## How to contribute

Want to generate feeds for something other than Rumble?
Create a pull request with the following:
1. src/posts module that exports a function returning posts. A post has the format of { title: string, link: string, date: string, description: string }. You can look into src/posts/rumble.js for an example.
2. route in src/server.js that calls your module-function to get the posts and then the getRSSFeed function to generate an RSS feed\
**Note:** please do not import any unnecessary modules. The ones that are being used in src/posts/rumble.js should be enough to parse any page and generate the posts.

If you have other ideas for improving this API, you can create a PR too. Maybe create a ticket first.
