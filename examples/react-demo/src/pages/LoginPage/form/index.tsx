import formConfig from './config';
import { Dispatcher } from "cloud-flow";

export default function LoginForm() {
    return (<Dispatcher data={formConfig}/>);
}
