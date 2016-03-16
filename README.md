## Description
test chrome extension
fetch and display coupons for amazon web 

## Initialization
```
> npm i
```
If webpack, gulp are not installed globaly
```
> npm i -g webpack
> npm i -g gulp
```
 
## Global dependencies
node v5.6.0 (tested v4.4.0), npm v3.6.0, webpack v1.12.14, gulp v3.9.1

downward compatibility not tested

## Build
```
> NODE_ENV=production webpack
> gulp build
```
for development (source-map, not minified)
```
> webpack
```


tested Debian 8, Chrome 48; Win 7, Chrome 49

## Issues
On Debian after cloning the repo gulp-imagemin produced no output or error. Didn't happen on Win7. Bug dissappeared after dependencies reinstalling.