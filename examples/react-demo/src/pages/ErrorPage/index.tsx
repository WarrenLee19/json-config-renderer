import React, {useState} from 'react' ;

/**
 *
 */
export default function ErrorPage() {
    const [msg, setMsg] = useState('同志，你是否迷路了?');
    return (
        <div>{msg}</div>
    );
}
