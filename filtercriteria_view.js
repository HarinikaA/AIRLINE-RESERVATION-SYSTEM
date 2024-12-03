var filterCriteria_component = {
    template: `
    <div class="item">
        <label id="itemName" @click="toggleOpenClose">
            <i :class="dropDownIconCls"></i>
            <span id="name">{{conf.name}}</span>
            <span id="selected-count" v-show="selectedCount > 0"> (<b>{{selectedCount}}</b> selected)</span>
        </label>
        <div id="itemBody" v-if="isOpen && isValuesPresent">
            <div id="subItems" >
                <filterCriteria-templates-controller 
                    :data="conf" 
                    :selected="selected"
                    :name="templateName" 
                    :type="data.templateType" 
                    @template_event="subItems_event">
                </filterCriteria-templates-controller>
            </div>
        </div>
    </div>
    `,
    props: {
        data: { type: Object, default: {} },
        conf: {
            type: Object,
            default: {}
        },
        selected: {
            type: Object,
            defalt: {}
        },
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    emits: ["subItems_event"],
    data: () => ({
        searchval: '',
        count: 0,
        units: [
            {
                codeId : 16,
                hasId : false,
                data_type : String,
                key:"MHz"
            },
            {
                codeId : 17,
                hasId : false,
                data_type : String,
                key:"GHz"
            }
        ],
        dropdownConfCriteria: {
            "rootCls": "dropdownView_root",
            "txtID": "txt",
            "numberID": "number",
            "rightIconCls": "MI-icon-10",
            "rightIconID": "rightIcon",
            "dropdownMenuID": "dropdownView_list",
            "listItemCls": "dropdownView_listItem",
            "isMultiSelect": false,
            "defaultTitle": "Condition",
            "showSelected": true,
            "title": "Select Condition",
            "enableMinSelection": true,
            "listItemParentID": "listItemParent",
            "showDropdownOnClick": true
        },
    }),
    methods: {
        toggleOpenClose() {
            let isOpen = this.conf.isOpen;
            let confCopy = this.conf;
            confCopy.isOpen = !isOpen;
            if(this.conf.isOpen && this.conf.isCustom && !this.isValuesPresent){
                let newObj = {
                    value:'',
                    unit:'',
                    id:''
                };
                confCopy.values.push(newObj);
            }
            this.$emit('subItems_event', "updateCustomValues", confCopy);
        },
        subItems_event(event_name, data) {
            this.$emit('subItems_event', event_name, data)
        },
        changeSelectedCondition(){

        }
    },
    watch: {

    },
    created() {
        
    },
    computed: {
        isValuesPresent() {
            return this.conf.values.length > 0 ? true : false;
        },
        dropDownIconCls() {
            return (this.conf.isOpen) ? 'MI-icon-21 open' : 'MI-icon-21'
        },
        name() {
            return this.data.name;
        },
        templateName() {
            let name = "";
            if (this.conf.isCustom) {
                name = name.concat("custom", this.conf.data_type);
                if (this.conf.units.list.length > 0) {
                    name = name.concat("hasUnit");
                }
            } else {
                name = "preDefined";
            }
            return name;
        },
        values() {
            return this.data.values || [];
        },
        confs() {
            return this.data.conf;
        },
        selectednames() {
            let names = [];
            if (this.data.selectedValues.length > 0) {
                this.data.selectedValues.forEach(subItem => {
                    names.push(subItem["val"]);
                });
            }
            return names;
        },
        selectedCount() {
            return Object.keys(this.selected).length;
        }
    }

};