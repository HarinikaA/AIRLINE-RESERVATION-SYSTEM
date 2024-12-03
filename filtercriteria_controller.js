var filterCriteria_controller = {
    
    template: `<filterCriteria-component  
                    :conf=conf
                    :selected = selected 
                    :isOpen = isOpen
                    @subItems_event="subItems_event">
                </filterCriteria-component>
                `,

    props: {
        data: { 
            type: Object, 
            default: {} 
        },
        conf: {
            type: Object,
            default:{}
        },
        selected:{
            type:Object,
            default:{}
        },
        isOpen:{
            type:Boolean,
            default:false
        }
    },

    emits: ["subItems_event"],

    data: () => ({
        
    }),

    methods: {
        subItems_event(event_name,data){
            this.$emit('subItems_event', event_name, data)
        },
    },

    created: function () {
        
    }
};
