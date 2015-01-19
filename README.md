# A search tool for GitHub repositries


###Here is the Github search app.
All in all it was about 20hrs of extremly fragmented work.


It's a single page Angular app, running on a really basic node server.

The styling is mostly Twitter Bootstrap, with a bit of tarting up. 

I used Less as a CSS preprocessor and set up a Gulp task to watch for changes and compile.

Dependancys are handled via Bower and dev dependencies via NPM.


I worked a bit of D3 into it too as I love D3.

It's hosted on Heroku and you can take a look at it here [https://gclapham-swan.herokuapp.com/#/](https://gclapham-swan.herokuapp.com/#/)

To delve into the code, clone the project, cd to the directory, then run:

	$ sudo npm install -g gulp

	$ sudo npm install

	$ bower install


Then, to run the server:

	$ node server
	
and if you want to run the Less watcher to automatically compile when the less file is changed.

	$ gulp watch-less
	
It was a fun task - the GitHub API is one I've never used and I could have gone on and on with it.
	
###Stuff I would have sorted - if I had more time
I noticed, fairly late, that I was getting some 403 Errors when I made too many api requests, as they choke it down when you are making freeform calls to the api without request autorisation. It would have been nice to add a catch for bad requests.

There are no unit tests. It's all a bit quick and dirty, given the timescale.

If you jump to the home page and back to the git page the graph doesn't re-initialise.






