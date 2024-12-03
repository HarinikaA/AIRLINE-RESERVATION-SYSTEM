var searchFilter_controller = {
    template:`
    <searchFilter-component :cri_data="cri_data" :selected_filts="selected_filts"></searchFilter-component>
    `,
    props:{
        
    },
    data: () => ({
        cri_data:cri_data,
        selected_filts:selected_filts
    })
};