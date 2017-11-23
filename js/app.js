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
				}.bind(this)
			});
		}
	};
})(OC, OCA, Vue, $, _);

$(document).ready(function () {
	OCA.CanIUpdate.App.initialise();
});
