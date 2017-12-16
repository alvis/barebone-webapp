## Deployment to Firebase

To setup a firebase deployment, setup with the following steps.

1. Run `firebase login:ci` to receive a deployment token and export it to the environment variable `FIREBASE_TOKEN`. 
2. Run `firebase init` and setup `firebase.json` as usual.
3. Insert the following command in the deployment part of the Circle CI's config file.

```sh 
npm -g config set user root
npm install -g firebase-tools
firebase deploy --only hosting --token "$FIREBASE_TOKEN"
```

## Deployment to Github

Pushing the build to gh-pages is now a simple task. By default the deployment script will push the build in the `public` folder to gh-pages.

For custom domain, you can set it via the environment variable `CUSTOM_DOMAIN`. If the build is successful, the latest site will be available from the domain within minutes.

## Similar Projects
* [gatsby-advanced-starter](https://github.com/Vagr9K/gatsby-advanced-starter): A skeleton starter for GatsbyJS that focuses on SEO/Social features/development environment.
