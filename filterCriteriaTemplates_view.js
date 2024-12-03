var filterCriteriaTemplates_component = {
    template: `<div class="filterCriteriaTemplates_root">
                <component 
                    :is= "name"
                    :data= "data"
                    :selected="selected"
                    @template_event= "template_event">
                </component>
            </div>`,
    props: {
        name: {
            type: String,
            default: "default"
        },
        data: {
            type: Object,
        },
        type: {
            type: String,
        },
        selected: {
            type: Object,
            default: {}
        }
    },
    emits: ['template_event'],
    methods: {
        template_event(event_name, data) {
            this.$emit('template_event', event_name, data);
        }
    },
    computed: {
    },
    data() {
        return {
            preDefined: {
                template: `<div id="preDefined">
                                <label class="subItem"
                                v-for="(subValue,index) in data.values"
                                :key="index">
                                    <input type="checkbox" :checked="isChecked(subValue.value)" @click="toggleValueSelect(subValue,$event.target.checked)"> 
                                    <span>{{ subValue.value}}</span>
                                </label>
                            </div>`,
                emits: ['template_event'],
                props: {
                    data: {
                        type: Object,
                        default: {}
                    },
                    selected: {
                        type: Object,
                        default: []
                    }
                },
                computed: {
                    selectedValueNames() {
                        let names = [];
                        if (Object.keys(this.selected).length > 0) {
                            this.selected.value.forEach(value => {
                                names.push(value.val);
                            });
                        }
                        return names;
                    },
                },
                methods: {
                    isChecked(value) {
                        return (this.selectedValueNames.indexOf(value) === -1) ? false : true;
                    },
                    toggleValueSelect(valueObj, isChecked) {
                        if (isChecked) {
                            let newObj = {
                                val: valueObj.value,
                                unit: '',
                                id: valueObj.id
                            };
                            let selectedCopy = this.selected;
                            selectedCopy.value.push(newObj);
                            this.$emit('template_event', "updateCriteria", selectedCopy);
                        } else {
                            let index = this.selectedValueNames.indexOf(valueObj.value);
                            if (index !== -1) {
                                let selectedCopy = this.selected;
                                selectedCopy.value.splice(index, 1);
                                this.$emit('template_event', "updateCriteria", selectedCopy);
                            }
                        }
                    }
                },
            },
            customString: {
                template: `<div id="customString">
                                <div id="options">
                                    <div id="new" @click="addnew">
                                        <span class="material-symbols-outlined">
                                            add
                                        </span>
                                        <span id="add">New</span>
                                    </div>
                                    <div id="clear" @click="clearAll">
                                        <span>Clear All</span>
                                    </div>
                                </div>
                                <label class="subItem"
                                v-for="(subValue,index) in data.values"
                                :key="index">
                                    <input type="checkbox" :checked="isChecked(subValue.value)" @click="toggleValueSelect(subValue,$event.target.checked)">
                                    <div id="custom-input" v-show="index === OnEditStateValueIndex || isValueEmpty(index,subValue.value)" >
                                        <input type="text" placeholder="Enter value" v-model="currentEditValue[index]" :ref="'input-' + index" @blur="inputBlurEvent(index)" spellcheck="false" @keyup.enter="updateEdit(index)">
                                    </div>
                                    <div id="custom-input" v-show="index !== OnEditStateValueIndex">
                                        <div>{{subValue.value}}</div>
                                        <label class="material-symbols-outlined edit" @click="SetEditStateValueIndex(index,subValue.value)">
                                            edit
                                        </label>
                                    </div>                                     
                                </label>
                            </div>`,
                emits: ['template_event'],
                props: {
                    data: {
                        type: Object,
                        default: {}
                    },
                    selected: {
                        type: Object,
                        default: {}
                    }
                },
                data: () => ({
                    OnEditStateValueIndex: -1,
                }),
                computed: {
                    selectedValueNames() {
                        let names = [];
                        this.selected.value.forEach(value => {
                            names.push(value.val);
                        });
                        return names;
                    },
                    currentEditValue() {
                        let values = [];
                        this.data.values.forEach(val => {
                            values.push(val.value);
                        });
                        return values;
                    }
                },
                methods: {
                    isValueEmpty(index, value) {
                        if (value === '') {
                            this.SetEditStateValueIndex(index, value);
                        }
                    },
                    SetEditStateValueIndex(index) {
                        this.OnEditStateValueIndex = index;
                        if (index !== -1) {
                            this.$nextTick(() => {
                                const inputRef = this.$refs['input-' + index];
                                inputRef[0].focus();
                            });
                        }
                    },
                    inputBlurEvent(index) {
                        this.updateEdit(index);
                    },
                    updateEdit(index) {
                        if (this.currentEditValue[index] !== '' || this.currentEditValue[index] === undefined) {
                            let newObj = {
                                value: this.currentEditValue[index],
                                unit: '',
                                id: this.currentEditValue[index]
                            };
                            let dataCopy = this.data;
                            dataCopy.values.splice(index, 1, newObj);
                            if (this.currentEditValue[index] === undefined) {
                                dataCopy.values = [];
                            }
                            this.$emit('template_event', "updateCustomValues", dataCopy);
                            this.SetEditStateValueIndex(-1);
                            if (this.data.values[index] !== undefined) {
                                this.currentEditValue[index] = this.data.values[index].value;
                            }
                        } else if (this.currentEditValue[index] === '') {
                            let dataCopy = this.data;
                            if (this.isChecked(dataCopy.values[index]['value'])) {
                                let selectedCopy = [];
                                selectedCopy.value = [];
                                this.$emit('template_event', "updateCriteria", selectedCopy);
                            }
                            dataCopy.values.splice(index, 1);
                            this.$emit('template_event', "updateCustomValues", dataCopy);
                            this.SetEditStateValueIndex(-1);
                        }

                    },
                    addnew() {
                        let newObj = {
                            value: '',
                            unit: '',
                            id: ''
                        };
                        let dataCopy = this.data;
                        dataCopy.values.splice(0, 0, newObj);
                        this.$emit('template_event', "updateCustomValues", dataCopy);
                        this.SetEditStateValueIndex(0, '');
                    },
                    clearAll() {
                        let dataCopy = this.data;
                        dataCopy.values = [];
                        let selectedCopy = this.selected;
                        selectedCopy.value = [];
                        this.$emit('template_event', "updateCriteria", selectedCopy);
                        this.$emit('template_event', "updateCustomValues", dataCopy);
                    },
                    isChecked(value) {
                        return (this.selectedValueNames.indexOf(value) === -1) ? false : true;
                    },
                    toggleValueSelect(valueObj, isChecked) {
                        if (isChecked) {
                            let newObj = [{
                                val: valueObj.value,
                                unit: '',
                                id: valueObj.id
                            }];
                            let selectedCopy = this.selected;
                            selectedCopy.value = newObj;
                            this.$emit('template_event', "updateCriteria", selectedCopy);
                        } else {
                            let index = this.selectedValueNames.indexOf(valueObj.value);
                            if (index !== -1) {
                                let selectedCopy = this.selected;
                                selectedCopy.value = [];
                                this.$emit('template_event', "updateCriteria", selectedCopy);
                            }
                        }
                    }
                },
            },
            customNumber: {
                template: `<div id="customNumber">
                                <label class="subItem"
                                v-for="(subValue,index) in data.values"
                                :key="index" v-show="showSingleValues">
                                    <input type="checkbox" :checked="isChecked(subValue.value)" @click="toggleValueSelect(subValue,$event.target.checked)">
                                    <div id="custom-input" v-show="index === OnEditStateValueIndex" >
                                        <input type="text" placeholder="Enter value" v-model="currentEditValue[index]" :ref="'input-' + index" @blur="inputBlurEvent(index)" spellcheck="false" @keyup.enter="updateEdit(index)">
                                    </div>
                                    <div id="custom-input" v-show="index !== OnEditStateValueIndex" >
                                        <div>{{subValue.value}}</div>
                                        <label class="material-symbols-outlined edit" @click="SetEditStateValueIndex(index,subValue.value)">
                                            edit
                                        </label>
                                    </div>                                     
                                </label>
                                <label class="subItem"
                                v-for="(subValue,index) in data.values"
                                :key="index" v-show="!showSingleValues">
                                    <input type="checkbox" :checked="isChecked(subValue.value)" @click="toggleValueSelect(subValue,$event.target.checked)">
                                    <div id="custom-input" v-show="index === OnEditStateValueIndex" @blur="inputBlurEvent(index)" >
                                        <input type="text" placeholder="Enter value" v-model="currentEditValue[index][0]" :ref="'input-' + index + '0'" spellcheck="false" @keyup.enter="updateEdit(index)">
                                        <span id="to">to</span>
                                        <input type="text" placeholder="Enter value" v-model="currentEditValue[index][1]" :ref="'input-' + index + '1'"  spellcheck="false" @keyup.enter="updateEdit(index)">
                                    </div>
                                    <div id="custom-input" v-show="index !== OnEditStateValueIndex" >
                                        <div>
                                            {{subValue.value[0]}} 
                                            <span id="to">to</span>
                                            {{subValue.value[1]}} 
                                        </div>
                                        <label class="material-symbols-outlined edit" @click="SetEditStateValueIndex(index,subValue.value)">
                                            edit
                                        </label>
                                    </div>                                     
                                </label>
                            </div>`,
                emits: ['template_event'],
                props: {
                    data: {
                        type: Object,
                        default: () => ({ displayname: '' })
                    },
                    selected: {
                        type: Object,
                        default: {}
                    }
                },
                data: () => ({
                    OnEditStateValueIndex: -1,
                }),
                computed: {
                    showSingleValues() {
                        if (Object.keys(this.selected).length === 0) {
                            return true;
                        } else {
                            if (this.selected.condition === "in range") {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    selectedValueNames() {
                        let names = [];
                        if (Object.keys(this.selected).length > 0) {
                            if (this.selected.condition === "in range") {
                                this.selected.value.forEach(value => {
                                    names.push(value.val[0] + ' to ' + value.val[1]);
                                })
                            } else {
                                this.selected.value.forEach(value => {
                                    names.push(value.val);
                                });
                            }
                        }
                        return names;
                    },
                    currentEditValue() {
                        let values = [];
                        this.data.values.forEach(val => {
                            values.push(val.value);
                        });
                        return values;
                    }
                },
                methods: {
                    isValueEmpty(index, value) {
                        if (value === '') {
                            this.SetEditStateValueIndex(index, value);
                        }
                    },
                    SetEditStateValueIndex(index) {
                        this.OnEditStateValueIndex = index;
                        if (index !== -1) {
                            this.$nextTick(() => {
                                const inputRef = this.$refs['input-' + index];
                                inputRef[0].focus();
                            });
                        }
                    },
                    inputBlurEvent(index) {
                        this.updateEdit(index);
                    },
                    updateEdit(index) {
                        if (this.currentEditValue[index] !== '' || this.currentEditValue[index] === undefined) {
                            let newObj = {
                                value: this.currentEditValue[index],
                                unit: '',
                                id: this.currentEditValue[index]
                            };
                            let dataCopy = this.data;
                            dataCopy.values.splice(index, 1, newObj);
                            if (this.currentEditValue[index] === undefined) {
                                dataCopy.values = [];
                            }
                            this.$emit('template_event', "updateCustomValues", dataCopy);
                            this.SetEditStateValueIndex(-1);
                            if (this.data.values[index] !== undefined) {
                                this.currentEditValue[index] = this.data.values[index].value;
                            }
                        } else if (this.currentEditValue[index] === '') {
                            let dataCopy = this.data;
                            if (this.isChecked(dataCopy.values[index]['value'])) {
                                let selectedCopy = [];
                                selectedCopy.value = [];
                                this.$emit('template_event', "updateCriteria", selectedCopy);
                            }
                            dataCopy.values.splice(index, 1);
                            this.$emit('template_event', "updateCustomValues", dataCopy);
                            this.SetEditStateValueIndex(-1);
                        }
                    },
                    isChecked(value) {
                        return (this.selectedValueNames.indexOf(value) === -1) ? false : true;
                    },
                    toggleValueSelect(valueObj, isChecked) {
                        if (isChecked) {
                            let newObj = [{
                                val: valueObj.value,
                                unit: '',
                                id: valueObj.id
                            }];
                            let selectedCopy = this.selected;
                            if (Object.keys(this.selected).length === 0) {
                                selectedCopy = {
                                    condition: this.data.default.condition,
                                    name: this.data.name,
                                    value: []
                                }
                            }
                            selectedCopy.value = newObj;
                            this.$emit('template_event', "updateCriteria", selectedCopy);
                        } else {
                            let index = this.selectedValueNames.indexOf(valueObj.value);
                            if (index !== -1) {
                                let selectedCopy = this.selected;
                                selectedCopy.value = [];
                                this.$emit('template_event', "updateCriteria", selectedCopy);
                            }
                        }
                    }
                },
            },
            customNumberhasUnit: {
                template: `<div id="customNumberhasUnit">
                                <label class="subItem"
                                v-for="(subValue,index) in data.values"
                                :key="index" @click="selectedValueIndex = index">  
                                <input type="checkbox">                                    
                                <div id="custom-input" v-show="index === OnEditStateValueIndex" >
                                        <input type="text" placeholder="Enter value" :value="subValue.value" spellcheck="false" @keyup.enter="SetEditStateValueIndex(-1)">
                                        <div id="unit" v-show="!showUnitDropDown">
                                            <span>GHz</span>
                                            <span class="material-symbols-outlined">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        <dropdown-controller 
                                                :dropdown-configs="dropdownConfCriteria" 
                                                :data="units" 
                                                item-text="key"
                                                item-value="key"
                                                :hidden="[]" 
                                                :selected="subValue.unit"
                                                @change="changeSelectedUnit"
                                                name="unit"
                                        ></dropdown-controller>
                                    </div>
                                    
                                    <div id="custom-input" v-show="index !== OnEditStateValueIndex">  
                                        <div>{{subValue.value}} {{subValue.unit}}</div>
                                        <label class="material-symbols-outlined edit" @click="SetEditStateValueIndex(index)">
                                            edit
                                        </label>
                                    </div>                                     
                                </label>
                            </div>`,
                emits: ['template_event'],
                props: {
                    data: {
                        type: Object,
                        default: () => ({ displayname: '' })
                    },
                    selected: {
                        type: Object,
                        default: {}
                    }
                },
                data: () => ({
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
                    OnEditStateValueIndex: -1,
                    showUnitDropDown: true,
                    selectedValueIndex: 0,
                    dropdownConfCriteria: {
                        "rootCls": "dropdownView_root",
                        "txtID": "txt",
                        "numberID": "number",
                        "rightIconCls": "MI-icon-10",
                        "rightIconID": "rightIcon",
                        "dropdownMenuID": "dropdownView_list",
                        "listItemCls": "dropdownView_listItem",
                        "isMultiSelect": false,
                        "defaultTitle": "Unit",
                        "showSelected": true,
                        "title": "Select Unit",
                        "enableMinSelection": true,
                        "listItemParentID": "listItemParent",
                        "showDropdownOnClick": true
                    },
                }),
                computed: {
                    selectedValueNames() {
                        let names = [];
                        this.selected.value.forEach(value => {
                            names.push(value.val);
                        });
                        return names;
                    },
                },
                methods: {
                    SetEditStateValueIndex(index) {
                        this.OnEditStateValueIndex = index;
                    },
                    changeSelectedUnit(val) {
                    },
                    isChecked(value) {
                        return (this.selectedValueNames.indexOf(value) === -1) ? false : true;
                    },
                    toggleValueSelect(valueObj, isChecked) {
                        if (isChecked) {
                            valueObj['val'] = valueObj.value;
                            let selectedCopy = this.selected;
                            selectedCopy.value.push(valueObj);
                        } else {
                            let index = this.selectedValueNames.indexOf(valueObj.value);
                            if (index !== -1) {
                                let selectedCopy = this.selected;
                                selectedCopy.value.splice(index, 1);
                            }
                        }
                        this.$emit('template_event', "updateCriteria", selectedCopy);
                    }
                },
            }
        }
    },
    components: {},
    created() {
        if (this.$options && this.$options.components) {//for vue2
            this.$options.components[this.name] = { ...this[this.name] }
        }
        else { //for vue3
            this.$.appContext.components['filterCriteria-component'].components[this.name] = { ...this[this.name] };  // for vue3
        }
    },
}