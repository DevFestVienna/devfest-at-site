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
Check if you have [all requirments for local environment](http://jekyllrb.com/docs/installation/), install [Jekyll server](http://jekyllrb.com/docs/quickstart/) gem and run this command from project root folder:

```bash
    jekyll serve -w
```
Site will be available at http://127.0.0.1:4000/zeppelin/

**NOTE:** in this mode all changes to html and data files will be automatically regenerated, but after changing ```_config.yml``` you have to restart server.


### Resource optimizations (optional)

You can optimize images and minify css and javascript (image optimization for now only on Windows).
Optimize all images by running this script from `/automation/images/` folder:
```bash
    all_image_optimization.bat -d -jtran -pout -pquant -optip -gsicle -svgo
```

To minify CSS and JS run `minify_all.bat` or `minify_all.sh` from `/automation/minifying/` folder:
```bash
    minify_all.bat
```
```bash
    sh minify_all.sh
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


