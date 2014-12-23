(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "knockout", "app/urls"], factory);
	} else {
		// Browser globals
		factory(jQuery, ko);
	}
}(this, function($, ko, urls) {
	ko.bindingHandlers.profileViewer = {
		// takes a username as the value and returns a profile object
		update: function(el, valueAccessor, allBindings) {
			var profile = ko.utils.unwrapObservable(valueAccessor());

			if (!profile) {
				el.innerHTML = "No profile provided";
			} else {
				if (profile.fullName) {
					el.innerHTML = profile.fullName;
				} else {
					var url = urls.admin + "api/profiles/" + (profile.username ? profile.username : profile);
					$.ajax(url, {
						type: "GET",
						contentType: "application/json",
					}).then(function(data) {
						var obs = valueAccessor();

						if (ko.isObservable(obs)) {
							var prop;
							for (prop in data) {
								if (obs.hasOwnProperty(prop) && ko.isWriteableObservable(obs[prop])) {
									obs[prop](data[prop]);
								} else {
									obs[prop] = ko.observable(data[prop]);
								}
							}
						}

						el.innerHTML = data.fullName;
					});
				}
			}
		}
	};
}));
