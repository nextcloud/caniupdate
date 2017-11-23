<?php
/**
 * @copyright Copyright (c) 2017 Joas Schilling <coding@schilljs.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\CanIUpdate;


use OC\App\AppStore\Fetcher\AppFetcher;
use OC\Files\AppData\Factory;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\ILogger;

class FutureAppFetcher extends AppFetcher {
	/**
	 * @param Factory $appDataFactory
	 * @param IClientService $clientService
	 * @param ITimeFactory $timeFactory
	 * @param IConfig $config
	 * @param ILogger $logger
	 */
	public function __construct(Factory $appDataFactory,
								IClientService $clientService,
								ITimeFactory $timeFactory,
								IConfig $config,
								ILogger $logger) {
		parent::__construct(
			$appDataFactory,
			$clientService,
			$timeFactory,
			$config,
			$logger
		);

		$this->fileName = 'future-apps.json';
	}

}
