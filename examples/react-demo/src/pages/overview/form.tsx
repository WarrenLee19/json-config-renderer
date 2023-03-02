import {notification} from "apusic-ui";
import axios from 'axios'

async function getFormData() {
    try {
        const response = await axios({
            url: "/mocks/form1.json",
            method: "get"
        })
        console.log('==getFormData==',response);
        if(response.status === 200) {
            return {
                status: 1,
                data: response.data
            }
        }
        return {
            status: 0,
            msg: response.data?.message
        }
    } catch(error) {
        return {
            status: 0
        }
    }
}

const formData = {
    type: "form",
    title: '资源详情',
    className: "form-container",
    api: "/mocks/response.json",
    initApi: getFormData,
    // initApi: "https://api.66mz8.com/api/today.php?format=json",
    // initApi: {
    //     url: "https://api.66mz8.com/api/today.php?format=json",
    //     method: 'get',
    //     cache: 5000,
    //     callback: (result: any, form: any) => {
    //         console.log(result);
    //         return result;
    //     }
    // },
    body: [
        {
            type: "input-name",
            name: "serviceName",
            label: "服务名称",
            rules: [
                {
                    required: true,
                    message: '服务名称不能为空',
                },
                {
                    max: 10,
                    message: '服务名称不能超过10个字符',
                },
            ],
            disabled: false,
            placeholder: '请输入服务名称',
            span: 2
        },
        {
            type: "select",
            "name": "app",
            "label": "所属应用",
            "rules": [{
                // required: true,
                message: '所属应用不能为空',
            }],
            placeholder: '请输入所属应用',
            options: ['测试应用1', '测试应用2', '测试应用3'],
            visible: '{a} =1&&{b}=1',
        },
        {
            "type": "input",
            "name": "version",
            "label": "测试版本",
            "rules": [{
                // required: true,
                message: '版本不能为空',
            }],
            placeholder: '请输入版本',
        },
        {
            "type": "input",
            "name": "address",
            "label": "服务地址",
            "rules": [],
            placeholder: '请输入服务地址',
        },
        {
            "type": "input",
            "name": "version1",
            "label": "版本1",
            placeholder: '请输入版本1',
        },
        {
            "type": "checkbox",
            "name": "no3",
            "label": "不填3",
            options: [
                { label: 'Apple', value: 'Apple', disabled: true },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' },
            ],
        },
        {
            "type": "input-number",
            "name": "d1",
            "label": "单独1",
        },
        // {
        //     "type": "switch",
        //     "name": "d2",
        //     "label": "单独2",
        //     rules: [
        //         {
        //             required: true,
        //             message: '111'
        //         }
        //     ],
        // },
        // {
        //     "type": "slider",
        //     "name": "slider",
        //     "label": "温度",
        //     "rules": [{
        //         required: true,
        //         message: '必填项不能为空',
        //     }],
        // },
        // {
        //     "type": "date-picker",
        //     "name": "date-picker",
        //     "label": "日期",
        //     "rules": [{
        //         required: true,
        //         message: '必填项不能为空',
        //     }],
        //     showTime: true,
        // },

    ],
    width: '320',
    debug: true
}

export default formData;
