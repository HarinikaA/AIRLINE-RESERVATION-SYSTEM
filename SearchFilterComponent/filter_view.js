var searchFilter_component = {
    template: `
    <div class="search-container">
        <div id="search-bar">
            <input type="text" v-model="search_val" id="search-inp" placeholder="Search" spellcheck="false" autocomplete="off">
            <span class="material-symbols-outlined" id="search-icon">
                search
            </span>
        </div>
        <suggFiltContainer-controller :cri_data="cri_data" :selected_filts="selected_filts" :search_val="computedSearchVal">
        </suggFiltContainer-controller>
    </div>
    `,
    props:{
        cri_data:{
            type:Array,
            default:[]
        },
        selected_filts:{
            type:Array,
            default:[]
        }
    },
    data: () => ({
        search_val:''
    }),
    computed:{
        computedSearchVal(){
            return this.search_val;
        }
    },
    mounted(){
       
    }
};


