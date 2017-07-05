
Currently, Heroku env is not set to production so that dev dependencies are installed and webpack successfully builds. This is set by the following command:

```
heroku config:set NPM_CONFIG_PRODUCTION=false
```

Push a branch to Heroku:

```
git push heroku feature-redux-and-react-router-v4:master
```
