/**
 * @copyright (c) 2017 Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 */

(function(OC, OCA) {
	OCA.CanIUpdate = OCA.CanIUpdate || {};
	OCA.CanIUpdate.Components = OCA.CanIUpdate.Components || {};

	OCA.CanIUpdate.Components.Root = {
		template: '' +
		'<div class="section" id="caniupdate">' +
		'	<h2 class="inlineblock">' +
		'		'+ t('caniupdate', 'Can I upgrade?') + ' {{ canUpdate }}' +
		'	</h2>' +
		'	<p v-if="isListFetched" class="inlineblock cronlog">' +
		'		<span class="status" :class="statusIcon"></span>' +
		'		<span v-html="statusText"></span>' +
		'	</p>' +
		'	<div class="applist">' +
		'	<template v-if="missing.length">' +
		'		<h3>' + t('caniupdate', 'Missing updates') + '</h3>' +
		'		<ul>' +
		'			<li v-for="app in missing">{{app.appName}} <a :href="\'https://apps.nextcloud.com/\' + app.appId">' + t('caniupdate', 'View in store') + ' ↗</a></li>' +
		'		</ul>'+
		'	</template>' +
		'	<template v-if="available.length">' +
		'		<h3>' + t('caniupdate', 'Available new versions') + '</h3>' +
		'		<ul>' +
		'			<li v-for="app is available">{{app.appName}} <a :href="\'https://apps.nextcloud.com/\' + app.appId">' + t('caniupdate', 'View in store') + ' ↗</a></li>' +
		'		</ul>'+
		'	</template>' +
		'	</div>' +
		'</div>',

		el: '#caniupdate',
		data: {
			available: [],
			missing: [],
			appstoreFailed: false,
			appstoreDisabled: false,
			alreadyOnLatest: false,
			isListFetched: false
		},

		_$el: null,
		_$button: null,
		_$icon: null,
		_$container: null,

		computed: {
			canUpdate: function() {
				if (!this.isListFetched) {
					return t('caniupdate', 'Checking …');
				}

				if (this.alreadyOnLatest) {
					return t('caniupdate', 'You are already on the latest major version.');
				}

				if (this.appstoreDisabled) {
					return t('caniupdate', 'Store is disabled in your configuration.');
				}

				if (this.appstoreFailed) {
					return t('caniupdate', 'Maybe …');
				}

				return this.missing.length === 0 ? t('caniupdate', 'Yes!') : t('caniupdate', 'No!');
			},

			statusIcon: function() {
				if (this.appstoreDisabled) {
					return 'error';
				}

				if (this.alreadyOnLatest) {
					return 'success';
				}

				if (!this.isListFetched || this.appstoreFailed) {
					return 'indeterminate';
				}

				return this.missing.length === 0 ? 'success' : 'error';
			},

			statusText: function() {
				if (!this.isListFetched) {
					return '';
				}

				if (this.alreadyOnLatest) {
					return t('caniupdate', 'This app will show results again, once Nextcloud 14 is closed.');
				}

				if (this.appstoreDisabled) {
					return t('caniupdate', 'Please make sure your config.php does not set <samp>appstoreenabled</samp> to false.');
				}

				if (this.appstoreFailed) {
					return t('caniupdate', 'Could not connect to the store or it returned no upgrades at all. Search manually for updates or make sure your server has access to the internet and can connect to the store.');
				}

				return this.missing.length === 0 ? t('caniupdate', 'All apps have a version for Nextcloud {version} available', this) : n('caniupdate',
					'%n app has no version for Nextcloud {version} available',
					'%n apps have no version for Nextcloud {version} available',
				this.missing.length, this);
			}
		}
	};
})(OC, OCA);
