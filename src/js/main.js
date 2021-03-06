(function () {
    'use strict';
    document.querySelector('#h').insertAdjacentHTML(
        "afterEnd",
        `
        <div id="vue-app">
        <select>
            <option v-for="item, index in serviceList">
                {{ item.ResourceARN }}
            </option>
        </select>
        </div>
      `
    );

    var regionList = [
        'us-east-2',
        'us-east-1',
        'us-west-1',
        'us-west-2',
        'af-south-1',
        'ap-east-1',
        'ap-south-1',
        'ap-northeast-3',
        'ap-northeast-2',
        'ap-southeast-1',
        'ap-southeast-2',
        'ap-northeast-1',
        'ca-central-1',
        'cn-north-1',
        'cn-northwest-1',
        'eu-central-1',
        'eu-west-1',
        'eu-west-2',
        'eu-south-1',
        'eu-west-3',
        'eu-north-1',
        'me-south-1',
        'sa-east-1'
    ]

    chrome.storage.sync.get(["api_key", "secret_key"], function (input) {
        AWS.config.update({
            credentials: new AWS.Credentials(
                input.api_key,
                input.secret_key
            )
        });

        var serviceList = [];
        // URLのPathからサービスを取得
        var serviceName = location.pathname.split('/')[1];

        regionList.forEach(targetRegion => {
            AWS.config.update({
                region: targetRegion
            });
            var tagging = new AWS.ResourceGroupsTaggingAPI();
            var params = {
                ResourceTypeFilters: [serviceName],
                IncludeComplianceDetails: false
            };
            tagging.getResources(params, function (err, data) {
                if (err) {
                    // リージョンによってはリソースを取得できない。
                } else {
                    serviceList.push(...data.ResourceTagMappingList);
                }
            });
        });
        let vm = new Vue({
            el: "#vue-app",
            data: {
                serviceList: serviceList
            }
        });
    });
})();