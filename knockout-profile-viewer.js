(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "knockout", "app/urls"], factory);
	} else {
		// Browser globals
		factory(jQuery, ko);
	}
}(this, function ($, ko, urls) {
	ko.bindingHandlers.profileViewer = {
		// takes a username as the value and returns a profile object
		update: function (el, valueAccessor, allBindings) {
			var profile = ko.unwrap(valueAccessor());
			var showPlaceholder = allBindings.get("showPlaceholder");

			if (!profile) {
				//we got nothing
				if (showPlaceholder) {
					el.innerHTML = "No profile provided";
				}
				return;
			}

			if (profile.fullName) {
				//we already have the fullName, just use that, don't do any extra requests
				el.innerHTML = profile.fullName;
				return;
			}

			var username = profile.username || profile;

			if (!username && showPlaceholder) {
				//we still got nothing
				el.innerHTML = "No profile provided";
				return;
			}

			$.ajax(urls.admin + "profiles/" + username, {
				type: "GET",
				contentType: "application/json",
			}).then(function (data) {
				var obs = valueAccessor();

				if (ko.isWriteableObservable(obs)) {
					obs(data);
				}

				el.innerHTML = data.fullName;
			});
		}
	};
}));
