# DevFest Vienna website based on Project Zeppelin

### About 
The website is build using [Jekyll](http://jekyllrb.com/) - simple, blog-aware, static site generator.

The template is brought by [GDG Lviv](http://lviv.gdg.org.ua/) team.

### Quick-start guide
1. Update ```_config.yml``` 
2. Select what content blocks do you need in index.html
3. Commit and push changes
4. Drink a cup of coffee while [codeship.io](https://codeship.io) will publish the site on [test.devfest.at](http://test.devfest.at)

## Local development
To develop locally you need ruby gems & bundler installed.
```bash
    sudo gem install bundler
```

Then install all dependencies by calling bundle/npm install while in the source directory:
```bash
    bundle install
    npm install
```

To compile the files call rake while in the source tree:
```bash
    bundle exec rake
```

This will minify the JS, compile the CSS from SASS, and build the jekyll site.

To test a local server with the website locally:
```bash
    bundle exec rake server
```

### Used libraries
* [Bootstrap](https://github.com/twbs/bootstrap)
* [Animate.css](https://github.com/daneden/animate.css)
* [Waves](https://github.com/publicis-indonesia/Waves)
* [jquery.appear](https://github.com/bas2k/jquery.appear)
* [jQuery countTo Plugin](https://github.com/mhuggins/jquery-countTo)
* [Typed.js](https://github.com/mattboldt/typed.js)

### Contributors
* Design and markup: [Oleh Zasadnyy](https://github.com/ozasadnyy)
* Idea and Jekyll integration: [Vitaliy Zasadnyy](https://github.com/zasadnyy)

### Licence
Project is published under the [MIT licence](https://github.com/gdg-x/zeppelin/blob/master/LICENSE.txt). Feel free to clone and modify repo as you want, but don't forget to add reference to authors :)


