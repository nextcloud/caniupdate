/**
 * @copyright (c) 2017 Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 */

(function(OC, OCA, Vue, $, _) {
	"use strict";

	OCA.CanIUpdate = OCA.CanIUpdate || {};

	OCA.CanIUpdate.App = {


		/** @type {number|null} */
		interval: null,

		/** @type {Vue|null} */
		vm: null,

		/**
		 * Initialise the app
		 */
		initialise: function() {
			this.vm = new Vue(OCA.CanIUpdate.Components.Root);

			$.ajax({
				url: OC.linkToOCS('apps/caniupdate/api/v1', 2) + 'applist',
				type: 'GET',
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: function(response) {
					this.vm.available = response.ocs.data.available;
					this.vm.missing = response.ocs.data.missing;
					this.vm.version = response.ocs.data.version;
					this.vm.isListFetched = true;
					this.vm.appstoreFailed = false;
					this.vm.alreadyOnLatest = false;
				}.bind(this),
				error: function(xhr) {
					this.vm.available = [];
					this.vm.missing = [];
					this.vm.version = xhr.responseJSON.ocs.data.version;
					this.vm.appstoreDisabled = xhr.responseJSON.ocs.data.appstore_disabled;
					this.vm.alreadyOnLatest = xhr.responseJSON.ocs.data.already_on_latest;
					this.vm.isListFetched = true;
					this.vm.appstoreFailed = true;
				}.bind(this)
			});
		}
	};
})(OC, OCA, Vue, $, _);

$(document).ready(function () {
	OCA.CanIUpdate.App.initialise();
});
