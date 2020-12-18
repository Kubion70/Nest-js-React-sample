import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

export default function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            {
                promiseInProgress &&
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "absolute",
                    top: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Loader type="TailSpin" color="#3f51b5" height="100" width="100" />
                </div>
            }
        </>
    );
}