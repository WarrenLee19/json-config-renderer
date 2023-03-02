import { Dispatcher } from "cloud-flow";
import DataSource from './config';
import './index.scss';

export default function ArtWork() {
    return (
        <Dispatcher data={DataSource}/>
    );
}
