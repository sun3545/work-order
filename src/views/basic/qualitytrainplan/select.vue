<script>

export default {
  name: 'app',
  data(){
    return {
      columns: [
        {
          value: "id",
          text: "值",
        },
        {
          value: "name",
          text: "名字"
        }
      ],
      tree_table:[
        {
          id: "1",
          name: "第1级",
          Children: [
           {
             id: "1-1",
             name: "第1-1级",
             Children: [
               /* {
                  id: "1-1-1",
                  name: "第1-1-1级",
                }, */
                {
                  id: "1-1-2",
                  name: "第1-1-2级",
                  Children: [
                    {
                  id: "1-1-2-1",
                  name: "第1-1-2-1级",
                },
                {
                  id: "1-1-2-2",
                  name: "第1-2-2-2级",
                },
                  ]
                },
             ]
           },
           {
             id: "1-2",
             name: "第1-2级",
             Children: [
                {
                  id: "1-2-1",
                  name: "第1-2-1级",
                },
                {
                  id: "1-2-2",
                  name: "第1-2-2级",
                },
             ]
           },
          ]
        }
      ]
    }
  },
  methods: {
    getTreeTableSelect(val){
      console.log(val);
    }
  },
}
</script>