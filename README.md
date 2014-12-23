#Knockout Profile Viewer

> Knockout component to view a CivicSource Administrator or Auctioneer Profile.

##Install with [Bower](http://bower.io/)

```
bower install civicsource-knockout-profile-viewer --save
```

Then add the folder to your project.

##How to Use

`require` the script and use it as a binding handler:

```html
<span data-bind="profileViewer: myProfile"></span>
```

where `myProfile` is an observable you want two-way bound to the component. Its value can be either an object with a username property, or a string representing the username.

If the bound profile does not have a `fullName` property, it will hit the server to retrieve the full profile object and populate the observable. Otherwise, it will use what is passed in to show the profile's full name.
