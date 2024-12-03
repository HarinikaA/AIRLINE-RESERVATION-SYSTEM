var filter_component = {
    template: `
    <div class="search-container">
            <div id="search-bar">
                <input type="text" id="search-inp" placeholder="Search" spellcheck="false" autocomplete="off">
                <span class="material-symbols-outlined" id="search-icon">
                    search
                </span>
            </div>
            <div id="sugg-container">
                <div id="sugg-list">
                    <filterCriteria-controller :data="cri_data[0]" :conf="cri_item_conf" :selected="selected_filts[0]"></filterCriteria-controller>
                    <filterCriteria-controller :data="cri_data[1]" :conf="cri_item_conf" :selected="selected_filts[1]"></filterCriteria-controller>
                    <div class="item" data-dropdown="show" data-selected="true">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Event name</span>
                            <span id="appl-cond">contains
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </span>
                            <span id="selected-count">(<b>7</b> selected)</span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" id="item1" data-dropdown="show" data-selected="true" data-shown="less" data-field="custom" data-type="text">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_down
                            </span>
                            <span id="name">Event assigned to</span>
                            <span id="appl-cond">contains
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </span>
                            <span id="selected-count">(<b>2</b> selected)</span>
                        </div>
                        <div id="itemBody">
                            <div id="options">
                                <div id="new">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                    <span id="add">New</span>
                                </div>
                                <div id="clear">
                                    <span>Clear All</span>
                                </div>
                            </div>
                            <div id="subItems">
                                <div class="subItem">
                                    <input type="checkbox" id="item2" name="item2" value="item2">
                                    <div id="custom-input">
                                        <input type="text" placeholder="Enter value" value="aji@zohocorp.com" spellcheck="false">
                                    </div>
                                </div>
                                <div class="subItem">
                                    <input type="checkbox" id="item2" name="item2" value="item2">
                                    <label for="item2">abc@zohocorp.com</label>
                                    <span class="material-symbols-outlined edit">
                                        edit
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Service</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">
                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Role</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Sub-Role</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Group</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Status</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">IP</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">VLAN</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Switch</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Host IP</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Kernel Version</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="pre-defined">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">OS</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-selected="true" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined" style="/* color: #808080; */">
                                keyboard_arrow_right
                            </span>
                            <span id="name" style="color: #808080">
                                Max CPU Speed :&nbsp;
                                <span
                                id="name"
                                style="text-decoration: line-through; color: #a3a3a3; display: none">
                                less than
                                </span>
                            </span>
                            <span class="material-symbols-outlined" style="margin-left: 0.25vw; color: #b0b0b0; display: none">
                                arrow_forward 
                            </span>
                            <span style="/* margin-left: 0.25vw; */">greater than</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count">(<b> less than</b> selected )</span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-selected="true" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined" style="/* color: #808080; */">
                                keyboard_arrow_right
                            </span>
                            <span id="name" style="color: #808080">
                                Max CPU Speed :&nbsp;
                                <span
                                id="name"
                                style="text-decoration: line-through; color: #a3a3a3; display: none">
                                less than
                                </span>
                            </span>
                            <span class="material-symbols-outlined" style="margin-left: 0.25vw; color: #b0b0b0; display: none">
                                arrow_forward 
                            </span>
                            <span style="/* margin-left: 0.25vw; */">greater than</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count">(<b> less than</b> selected )</span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">Machine Type</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">No of Disks</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">No of NICs</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">No of Processors</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                    <div class="item" id="item1" data-dropdown="show" data-selected="true" data-shown="less"
                        data-field="custom" data-type="number">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_down
                            </span>
                            <span id="name">Swap size</span>
                            <span id="appl-cond">in range
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </span>
                            <span id="selected-count">(<b></b> selected )</span>
                        </div>
                        <div id="itemBody">
                            <!-- <div id="options">
                                <div id="clear">
                                    <span id="reset">Clear</span>
                                </div>
                            </div> -->
                            <div id="subItems">
                                <div class="subItem">
                                    <input type="checkbox" id="item2" name="item2" value="item2">
                                    <div id="custom-input">
                                        <input type="text" placeholder="Enter value" value="0" spellcheck="false">
                                        <div id="unit">
                                            <span>GHz</span>
                                            <span class="material-symbols-outlined">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                    </div>
                                    <span id="to"> to </span>
                                    <div id="custom-input">
                                        <input type="text" placeholder="Enter value" value="10000" spellcheck="false">
                                        <div id="unit">
                                            <span>GHz</span>
                                            <span class="material-symbols-outlined">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="subItem">
                                    <input type="checkbox" id="item2" name="item2" value="item2">
                                    <div id="custom-input">
                                        <input type="text" placeholder="Enter value" value="0" spellcheck="false">
                                        <div id="unit">
                                            <span>GHz</span>
                                            <span class="material-symbols-outlined">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="item" data-dropdown="show" data-field="custom">
                        <div id="itemName">
                            <span class="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                            <span id="name">RAM Memory</span>
                            <span id="appl-cond"></span>
                            <span id="selected-count"></span>
                        </div>
                        <div id="subItems">

                        </div>
                    </div>
                </div>
                <div id="applied-filts">
                    <div id="title">
                        <span id="filter-count">4</span>
                        <span>Filters Selected</span>
                    </div>
                    <div id="filters">
                        <div class="filter" data-shown="less" data-unit="hide" data-addBtn="hide" data-input="select">
                            <div id="filter-close">
                                <span class="material-symbols-outlined">
                                    cancel
                                </span>
                            </div>
                            <span id="title">Event name</span>
                            <div id="condition">
                                <span>contains</span>
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </div>
                            <div id="filterBody">
                                <div id="items">
                                    <div class="item">
                                        <span id="content" spellcheck="false">AGENT_DATA_ISSUES</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item">
                                        <span id="content" spellcheck="false"
                                            title="AGENT_LOG_SUPPRESSED">AGENT_LOG_SUPPRESSED</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item">
                                        <span id="content" spellcheck="false"
                                            title="AGENT_PROVISIONING_ERROR">AGENT_PROVISIONING_ERROR</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item">
                                        <span id="content" spellcheck="false" title="AMD_ERRATUM_1474_ISSUE">
                                            AMD_ERRATUM_1474_ISSUE</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item hidden">
                                        <span id="content" spellcheck="false" title="AMD_ERRATUM_1474_ISSUE">
                                            AMD_ERRATUM_1474_ISSUE</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item hidden">
                                        <span id="content" spellcheck="false" title="AMD_ERRATUM_1474_ISSUE">
                                            AMD_ERRATUM_1474_ISSUE</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item hidden">
                                        <span id="content" spellcheck="false" title="AMD_ERRATUM_1474_ISSUE">
                                            AMD_ERRATUM_1474_ISSUE</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                </div>
                                <div id="view-dropdwn" data-shown="view-more">
                                    <div id="view-more">
                                        <span>+3 more</span>
                                        <span class="material-symbols-outlined">
                                            keyboard_arrow_down
                                        </span>
                                    </div>
                                    <div id="view-less">
                                        <span>view less</span>
                                        <span class="material-symbols-outlined">
                                            keyboard_arrow_up
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="filter" data-shown="less" data-unit="hide" data-addBtn="show" data-input="custom">
                            <div id="filter-close">
                                <span class="material-symbols-outlined">
                                    cancel
                                </span>
                            </div>
                            <span id="title">Event assigned to</span>
                            <div id="condition">
                                <span>contains</span>
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </div>
                            <div id="filterBody">
                                <div id="items">
                                    <div id="add-new">
                                        <div id="icon-wrapper">
                                            <span class="material-symbols-outlined add">
                                                add
                                            </span>
                                        </div>
                                        <span id="add">New</span>
                                    </div>
                                    <!-- <div class="item">
                                        <input type="text"spellcheck="false" value="abc@zohocorp.com"></input>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div> -->
                                    <div class="item">
                                        <span id="content" spellcheck="false">aj@zohocorp.com</span>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="filter" data-shown="less" data-unit="show" data-addBtn="show" data-input="custom"
                            data-input="custom">
                            <div id="filter-close">
                                <span class="material-symbols-outlined">
                                    cancel
                                </span>
                            </div>
                            <span id="title">Max CPU Speed</span>
                            <div id="condition">
                                <span>contains</span>
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </div>
                            <div id="filterBody">
                                <div id="items">
                                    <div class="item">
                                        <span id="content" spellcheck="false">1000 GHz</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item">
                                        <span id="content" spellcheck="false">1110 GHz</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                    <div class="item">
                                        <span id="content" spellcheck="false">1110 GHz</span>
                                        <span class="material-symbols-outlined close">
                                            close
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="filter" data-shown="less" data-unit="show" data-addBtn="hide" data-input="custom">
                            <div id="filter-close">
                                <span class="material-symbols-outlined">
                                    cancel
                                </span>
                            </div>
                            <span id="title">Swap Size</span>
                            <div id="condition">
                                <span>less than</span>
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </div>
                            <div id="filterBody">
                                <div id="items">
                                    <!-- <div class="item">
                                        <div id="custom-input">
                                            <input type="text" placeholder="Enter value" value="10000">
                                            <div id="unit">
                                                <span>GHz</span>
                                                <span class="material-symbols-outlined">
                                                    keyboard_arrow_down
                                                </span>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="item">
                                        <span id="content" spellcheck="false">10000 GHz </span>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="action-btns">
                        <span id="cancel">Cancel</span>
                        <span id="apply">Apply</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: () => ({
        cri_data : [
            {
              "name": "Event name",
              "values": [
                { "value": "AGENT_DATA_ISSUES", "_id": "AGENT_DATA_ISSUES" },
                { "value": "AGENT_LOG_SUPPRESSED", "_id": "AGENT_LOG_SUPPRESSED" },
                { "value": "AGENT_PROVISIONING_ERROR", "_id": "AGENT_PROVISIONING_ERROR" },
                { "value": "AMD_ERRATUM_1474_ISSUE", "_id": "AMD_ERRATUM_1474_ISSUE" },
                { "value": "APPGROUP_COMPONENTS_UNDER_SAME_RACK", "_id": "APPGROUP_COMPONENTS_UNDER_SAME_RACK" },
                { "value": "APP_PARAM_THRESHOLD_EXCEEDED", "_id": "APP_PARAM_THRESHOLD_EXCEEDED" },
                { "value": "ARANGODB_REPLICATION_ISSUES", "_id": "ARANGODB_REPLICATION_ISSUES" },
                { "value": "BACKUP_HSM_CONNECTIVITY_ISSUE", "_id": "BACKUP_HSM_CONNECTIVITY_ISSUE" },
                { "value": "BACKUP_HSM_CONNECTIVITY_ISSUES", "_id": "BACKUP_HSM_CONNECTIVITY_ISSUES" },
                { "value": "BDAAS_CONSUMER_LAG", "_id": "BDAAS_CONSUMER_LAG" }   
              ],
              "conditions": ["contains", "not contains"],
              "units": {
                "list": [],
                "listOrder": ""
              },
              "search_conf": {
                "patternVsvalue": [/^[a-zA-Z0-9_]+$/],
                "patternVsunit": {}
              },
              "validator": /^[A-Z0-9]+(_[A-Z0-9]+)*$/,
              "data_type": "string",
              "default": {
                "condition": "contains",
                "value": "",
                "unit": "",
              }
            },
            {
              "name": "Event Assigned to",
              "values": [
                {
                    value: "aji@zohocorp.com",
                    id: "aji@zohocorp.com"
                },
                {
                    value: "aji@zohocorp.com",
                    id: "aji@zohocorp.com"
                }
              ],
              "conditions": ["contains", "not contains"],
              "units": {
                "list": [],
                "listOrder": ""
              },
              "search_conf": {
                "patternVsvalue": [/^[a-zA-Z@.]+$/],
                "patternVsunit": {}
              },
              "validator": /^[a-zA-Z]+(.[a-zA-Z]+)*@zohocorp.com$/,
              "data_type": "string",
              "default": {
                "condition": "contains",
                "value": "",
                "unit": ""
              }
            },
            {
              "name": "Service",
              "values": [
                { "value": "0Trust", "_id": "0Trust" },
                { "value": "Aalam", "_id": "Aalam" },
                { "value": "Aalam-Csez", "_id": "Aalam-Csez" },
                { "value": "Accio", "_id": "Accio" },
                { "value": "Accounts", "_id": "Accounts" },
                { "value": "Accounts-Csez", "_id": "Accounts-Csez" },
                { "value": "Accounts-NewCsez", "_id": "Accounts-NewCsez" },
                { "value": "Accounts-Sas", "_id": "Accounts-Sas" },
                { "value": "AccountsART", "_id": "AccountsART" },
                { "value": "AccountsOperations", "_id": "AccountsOperations" },
                { "value": "ACME", "_id": "ACME" },
                { "value": "AI-Stratus-Csez", "_id": "AI-Stratus-Csez" },
                { "value": "AIDev", "_id": "AIDev" },
                { "value": "Aiops", "_id": "Aiops" },
                { "value": "AIStratus", "_id": "AIStratus" },
                { "value": "AlarmCentral", "_id": "AlarmCentral" },
                { "value": "Alm", "_id": "Alm" },
                { "value": "Analytics-Csez", "_id": "Analytics-Csez" },
                { "value": "APIGateway", "_id": "APIGateway" },
                { "value": "Appcreator", "_id": "Appcreator" },
                { "value": "Appsense", "_id": "Appsense" },
                { "value": "Apptics-Csez", "_id": "Apptics-Csez" },
                { "value": "Aran", "_id": "Aran" },
                { "value": "Arattai", "_id": "Arattai" },
                { "value": "Arattai-Csez", "_id": "Arattai-Csez" },
                { "value": "Arm", "_id": "Arm" },
                { "value": "Artifactory", "_id": "Artifactory" },
                { "value": "Assets", "_id": "Assets" },
                { "value": "Assist", "_id": "Assist" },
                { "value": "Assist-csez", "_id": "Assist-csez" },
                { "value": "AT-Module", "_id": "AT-Module" },
                { "value": "Atom", "_id": "Atom" },
                { "value": "AutoMater-Csez", "_id": "AutoMater-Csez" },
                { "value": "Backstage", "_id": "Backstage" },
                { "value": "Backstage-Csez", "_id": "Backstage-Csez" },
                { "value": "Bala", "_id": "Bala" },
                { "value": "BDaaSAdmin", "_id": "BDaaSAdmin" },
                { "value": "BDaaSAdmin-Csez", "_id": "BDaaSAdmin-Csez" },
                { "value": "Bfsi", "_id": "Bfsi" },
                { "value": "Blockchain", "_id": "Blockchain" },
                { "value": "Bluepencil", "_id": "Bluepencil" },
                { "value": "Blueprint", "_id": "Blueprint" },
                { "value": "Blueprint-Csez", "_id": "Blueprint-Csez" },
                { "value": "Blueprintplus", "_id": "Blueprintplus" },
                { "value": "Bonitas-Charmtracker", "_id": "Bonitas-Charmtracker" },
                { "value": "Books", "_id": "Books" },
                { "value": "Books-csez", "_id": "Books-csez" },
                { "value": "Browser360", "_id": "Browser360" },
                { "value": "Bugbounty", "_id": "Bugbounty" },
                { "value": "bugtracker", "_id": "bugtracker" },
                { "value": "C7-4-Test-L3", "_id": "C7-4-Test-L3" },
                { "value": "C7L3Test", "_id": "C7L3Test" },
                { "value": "CaaS", "_id": "CaaS" },
                { "value": "Calendar", "_id": "Calendar" },
                { "value": "Calendar-Csez", "_id": "Calendar-Csez" },
                { "value": "Campaign", "_id": "Campaign" },
                { "value": "Campaign-Csez", "_id": "Campaign-Csez" },
                { "value": "Campaigns-Csez", "_id": "Campaigns-Csez" },
                { "value": "Catalyst", "_id": "Catalyst" },
                { "value": "Catalyst-Csez", "_id": "Catalyst-Csez" },
                { "value": "Chaos", "_id": "Chaos" },
                { "value": "Charm", "_id": "Charm" },
                { "value": "CharmSandboxAccounts", "_id": "CharmSandboxAccounts" },
                { "value": "chat", "_id": "chat" },
                { "value": "Chat-Csez", "_id": "Chat-Csez" },
                { "value": "Chat-EU", "_id": "Chat-EU" },
                { "value": "Chat-Ozen", "_id": "Chat-Ozen" },
                { "value": "Check", "_id": "Check" },
                { "value": "Cia", "_id": "Cia" },
                { "value": "Circuit", "_id": "Circuit" },
                { "value": "Circuit-Csez", "_id": "Circuit-Csez" },
                { "value": "Cirrus", "_id": "Cirrus" },
                { "value": "Cirrus-Csez", "_id": "Cirrus-Csez" },
                { "value": "Cloud", "_id": "Cloud" },
                { "value": "Cloud-Csez", "_id": "Cloud-Csez" },
                { "value": "Cloudbuild", "_id": "Cloudbuild" },
                { "value": "CloudDB-Csez", "_id": "CloudDB-Csez" },
                { "value": "Cloudsecurityplus", "_id": "Cloudsecurityplus" },
                { "value": "cntest", "_id": "cntest" },
                { "value": "Code", "_id": "Code" },
                { "value": "Code-Csez", "_id": "Code-Csez" },
                { "value": "Code-IN", "_id": "Code-IN" },
                { "value": "CodeDCSwitch", "_id": "CodeDCSwitch" },
                { "value": "Codemine", "_id": "Codemine" },
                { "value": "CodeMine-Csez", "_id": "CodeMine-Csez" },
                { "value": "CodeMine-Tester", "_id": "CodeMine-Tester" },
                { "value": "CodeMine-Tester-Csez", "_id": "CodeMine-Tester-Csez" },
                { "value": "Codesync", "_id": "Codesync" },
                { "value": "CODEVLAN", "_id": "CODEVLAN" },
                { "value": "CommandCenter", "_id": "CommandCenter" },
                { "value": "CommandCenter-Csez", "_id": "CommandCenter-Csez" },
                { "value": "common", "_id": "common" },
                { "value": "Common-Memcache", "_id": "Common-Memcache" },
                { "value": "Community", "_id": "Community" },
                { "value": "Comply", "_id": "Comply" },
                { "value": "Components", "_id": "Components" },
                { "value": "Connect", "_id": "Connect" },
                { "value": "Connect-Llvm", "_id": "Connect-Llvm" },
                { "value": "Contactmanager", "_id": "Contactmanager" },
                { "value": "Contacts", "_id": "Contacts" },
                { "value": "Contacts-Csez", "_id": "Contacts-Csez" },
                { "value": "Contactslab", "_id": "Contactslab" },
                { "value": "Contactslab-Csez", "_id": "Contactslab-Csez" },
                { "value": "Contracts", "_id": "Contracts" },
                { "value": "Contracts-Dev", "_id": "Contracts-Dev" },
                { "value": "Cpps", "_id": "Cpps" },
                { "value": "Creator", "_id": "Creator" },
                { "value": "Creator-csez", "_id": "Creator-csez" },
                { "value": "Creatorplus", "_id": "Creatorplus" },
                { "value": "crm", "_id": "crm" },
                { "value": "Crm-csez", "_id": "Crm-csez" },
                { "value": "CrmImap", "_id": "CrmImap" },
                { "value": "CrmLocalBaihui", "_id": "CrmLocalBaihui" },
                { "value": "CrmOne", "_id": "CrmOne" },
                { "value": "crmplatform", "_id": "crmplatform" },
                { "value": "Crmplus", "_id": "Crmplus" },
                { "value": "Crmpremium", "_id": "Crmpremium" },
                { "value": "Crmrelease", "_id": "Crmrelease" },
                { "value": "Crmswitch", "_id": "Crmswitch" },
                { "value": "Cstore", "_id": "Cstore" },
                { "value": "Custom", "_id": "Custom" },
                { "value": "Cybersecurity", "_id": "Cybersecurity" },
                { "value": "D7-4-Backup-Old-Tools", "_id": "D7-4-Backup-Old-Tools" },
                { "value": "D8", "_id": "D8" },
                { "value": "DataLair", "_id": "DataLair" },
                { "value": "Datastore-Csez", "_id": "Datastore-Csez" },
                { "value": "DB-Service", "_id": "DB-Service" },
                { "value": "DCAP-Preview", "_id": "DCAP-Preview" },
                { "value": "Dcp", "_id": "Dcp" },
                { "value": "Decision-Maker", "_id": "Decision-Maker" },
                { "value": "Defect", "_id": "Defect" },
                { "value": "Defect-Csez", "_id": "Defect-Csez" },
                { "value": "Defect-Development", "_id": "Defect-Development" }
              ],
              "conditions": ["contains", "not contains"],
              "units": {
                "list": [],
                "listOrder": ""
              },
              "search_conf": {
                "patternVsvalue": [/^[a-zA-Z0-9-_]+$/],
                "patternVsunit": {}
              },
              "validator": /^[a-zA-Z0-9-_]+$/,
              "data_type": "string",
              "default": {
                "condition": "contains",
                "value": "",
                "unit": ""
              }
            },
            {
              "name": "Role",
              "values": [
                { "value": "0trust", "_id": "0trust" },
                { "value": "10kasi", "_id": "10kasi" },
                { "value": "aalam", "_id": "aalam" },
                { "value": "aalam-csez", "_id": "aalam-csez" },
                { "value": "ABM", "_id": "ABM" },
                { "value": "accio", "_id": "accio" },
                { "value": "Accountant", "_id": "Accountant" },
                { "value": "accounts", "_id": "accounts" },
                { "value": "accounts_dev", "_id": "accounts_dev" },
                { "value": "Additional Slave", "_id": "Additional Slave" },
                { "value": "Admin", "_id": "Admin" },
                { "value": "adminpanel", "_id": "adminpanel" },
                { "value": "afaccounts", "_id": "afaccounts" },
                { "value": "AI", "_id": "AI" },
                { "value": "aiops", "_id": "aiops" },
                { "value": "AlarmProcess", "_id": "AlarmProcess" },
                { "value": "AlarmsOneMobileApp", "_id": "AlarmsOneMobileApp" },
                { "value": "alarmsoneSync", "_id": "alarmsoneSync" },
                { "value": "alerts_s1", "_id": "alerts_s1" },
                { "value": "alpha", "_id": "alpha" },
                { "value": "alpha1", "_id": "alpha1" },
                { "value": "AlphaStore", "_id": "AlphaStore" },
                { "value": "AlphaStorefront", "_id": "AlphaStorefront" },
                { "value": "amw", "_id": "amw" },
                { "value": "analyser", "_id": "analyser" },
                { "value": "Analytics", "_id": "Analytics" },
                { "value": "analytics-cc", "_id": "analytics-cc" },
                { "value": "analytics-insights", "_id": "analytics-insights" },
                { "value": "analytics-snapshot", "_id": "analytics-snapshot" },
                { "value": "analyticsclient-review", "_id": "analyticsclient-review" },
                { "value": "analyticsnlp", "_id": "analyticsnlp" },
                { "value": "analyticssubgrid-export", "_id": "analyticssubgrid-export" },
                { "value": "Analyzer", "_id": "Analyzer" },
                { "value": "angular", "_id": "angular" },
                { "value": "anomaly", "_id": "anomaly" },
                { "value": "anomaly2", "_id": "anomaly2" },
                { "value": "antifraud", "_id": "antifraud" },
                { "value": "aoc", "_id": "aoc" },
                { "value": "APDEV1", "_id": "APDEV1" },
                { "value": "APDEV2", "_id": "APDEV2" },
                { "value": "APDEV3", "_id": "APDEV3" },
                { "value": "Api", "_id": "Api" },
                { "value": "Apiauto", "_id": "Apiauto" },
                { "value": "apidevlocal", "_id": "apidevlocal" },
                { "value": "apidocs", "_id": "apidocs" },
                { "value": "ApiGateway", "_id": "ApiGateway" },
                { "value": "aplus-export", "_id": "aplus-export" },
                { "value": "APLUSQA", "_id": "APLUSQA" },
                { "value": "applog", "_id": "applog" },
                { "value": "applog_client", "_id": "applog_client" },
                { "value": "applog_plus", "_id": "applog_plus" },
                { "value": "appproxy", "_id": "appproxy" },
                { "value": "appsense", "_id": "appsense" },
                { "value": "appsenseagent", "_id": "appsenseagent" },
                { "value": "AppServer", "_id": "AppServer" },
                { "value": "apptics-web", "_id": "apptics-web" },
                { "value": "apptics_dev1", "_id": "apptics_dev1" },
                { "value": "apptics_qa", "_id": "apptics_qa" },
                { "value": "arattai", "_id": "arattai" },
                { "value": "arattai-profile", "_id": "arattai-profile" },
                { "value": "arattaiav", "_id": "arattaiav" },
                { "value": "Archiving", "_id": "Archiving" },
                { "value": "arm", "_id": "arm" },
                { "value": "Art", "_id": "Art" },
                { "value": "artifactory", "_id": "artifactory" },
                { "value": "askzia", "_id": "askzia" },
                { "value": "asmclient", "_id": "asmclient" },
                { "value": "Aspportal", "_id": "Aspportal" },
                { "value": "assist-agent", "_id": "assist-agent" },
                { "value": "assist-dccloud", "_id": "assist-dccloud" },
                { "value": "assist-dccsez", "_id": "assist-dccsez" },
                { "value": "assist-dev", "_id": "assist-dev" },
                { "value": "assist-mobile1", "_id": "assist-mobile1" },
                { "value": "assist-mobile2", "_id": "assist-mobile2" },
                { "value": "assist-mobile3", "_id": "assist-mobile3" },
                { "value": "assist-monitor", "_id": "assist-monitor" },
                { "value": "assist-qa", "_id": "assist-qa" },
                { "value": "assist-qa2", "_id": "assist-qa2" },
                { "value": "assist-record", "_id": "assist-record" },
                { "value": "assist-sac", "_id": "assist-sac" },
                { "value": "assist-scale", "_id": "assist-scale" },
                { "value": "assist-scale1", "_id": "assist-scale1" },
                { "value": "assist-security", "_id": "assist-security" },
              ],
              "conditions": ["contains", "not contains"],
              "units": {
                "list": [],
                "listOrder": ""
              },
              "search_conf": {
                "patternVsvalue": [/^[a-zA-Z0-9-_]+$/],
                "patternVsunit": {}
              },
              "validator": /^[a-zA-Z0-9-_]+$/,
              "data_type": "string",
              "default": {
                "condition": "contains",
                "value": "",
                "unit": ""
              }
            },
            {
              "name": "IP",
              "values": [],
              "conditions": ["contains", "not contains"],
              "units": {
                "list": [],
                "listOrder": ""
              },
              "search_conf": {
                "patternVsvalue": [/^[0-9]+\.[0-9]+(\.[0-9]+)*$/],
                "patternVsunit": {}
              },
              "validator": "/^[0-9]+(.[0-9]+)*$/",
              "data_type": "string",
              "default": {
                "condition": "contains",
                "value": "",
                "unit": ""
              }
            },
            {
              "name": "Max CPU Speed",
              "values": [],
              "conditions": ["less than", "greater than", "in range"],
              "units": {
                "list": ["MHz", "GHz"],
                "listOrder": "asc"
              },
              "search_conf": {
                "patternVsvalue": [/^[0-9]+$/, /^[0-9]*(\s)*(((giga(\s*hertz)?)|(GH|Gh|gh)(z|Z)*)|((mega(\s*hertz)?)|(MH|Mh|mh)(z|Z)*)|[gGmM])+$/],
                "patternVsunit": {
                  "/((giga(\s*hertz)?)|(GH|Gh|gh)(z|Z)*)|[gG]/": "GHz",
                  "/((mega(\s*hertz)?)|(MH|Mh|mh)(z|Z)*)|[mM]/": "MHz",
                }
              },
              "validator": /^[0-9]+[ a-zA-z]*$/,
              "data_type": "number",
              "default": {
                "condition": "less than",
                "value": 0,
                "unit": "MHz"
              }
            },
            {
              "name": "No. of Disks",
              "values": [],
              "conditions": ["less than", "greater than", "in range"],
              "units": {
                "list": [],
                "listOrder": ""
              },
              "search_conf": {
                "patternVsvalue": [/^[0-9]+$/],
                "patternVsunit": {}
              },
              "validator": /^[0-9]+$/,
              "data_type": "number",
              "default": {
                "condition": "less than",
                "value": 0,
                "unit": ""
              }
            },
          ],
        cri_item_conf : {
            "dropdownCloseIconCls": "MI-icon-21",
            "dropdownOpenIconCls": "MI-icon-10",
            "showCondition": true,
            "showSelectedCount": true,
            "itemBodyOpen": true,
            "maxDisplayedValues": 5
        },
        selected_filts : [
            {
                condition: "contains",
                name: "Event Name",
                values: [
                    {
                        value: "AGENT_DATA_ISSUES",
                        unit: "",
                        id: "AGENT_DATA_ISSUES"
                    },
                    {
                        value: "AGENT_LOG_SUPPRESSED",
                        unit: "",
                        id: "AGENT_LOG_SUPPRESSED"
                    }
                ]
            },
            {
                condition: "contains",
                name: "Event Assigned to",
                values: [
                    {
                        value: "aji@zohocorp.com",
                        unit: "",
                        id: "aji@zohocorp.com"
                    },
                    {
                        value: "abc@zohocorp.com",
                        unit: "",
                        id: "abc@zohocorp.com"
                    }
                ]
            }
        ]

    }),
};


