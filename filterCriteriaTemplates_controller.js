var filterCriteriaTemplates_controller = {
    template: `<filterCriteria-templates-component
                    :name= "name"
                    :data= "data"
                    :type="type"
                    :selected = "selected"
                    @template_event= "template_event">
              </filterCriteria-templates-component>`,
    props: {
        name: {
            type: String
        },
        data: {
            type: Object
        },
        type: {
            type: String
        },
        events: {
            type: Object,
            default: () => ({})
        },
        selected: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['template_event'],
    methods: {
        template_event(event_name, data) {
            this.$emit('template_event', event_name, data)
        }
    },
}
