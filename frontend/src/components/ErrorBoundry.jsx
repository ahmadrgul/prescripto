import React from "react";
import { assets } from "../assets/assets_frontend/assets"

class ErrorBoundry extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught by ErrorBoundry:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="flex flex-col gap-6 items-center justify-center h-screen font-outfit">
                    <div className="flex gap-6 items-center">
                        <img 
                            src={assets.info_icon}
                            className="w-16"
                        />
                        <h3 className="text-5xl text-gray-600 font-medium text-center">Oops! Something went wrong. Try refreshing.</h3>
                    </div>
                    <p className="text-gray-600 text-center text-xl">If this persists, please consider reporting us at <a href="mailto:ahmadrgull786@gmail.com" className="text-blue-500">ahmadrgull786@gmail.com</a>. Thank you for your cooperation.</p>
                </main>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundry;