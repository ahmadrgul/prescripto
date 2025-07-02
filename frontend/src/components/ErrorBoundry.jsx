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
                <main className="flex gap-6 items-center justify-center h-screen font-outfit">
                    <img 
                        src={assets.info_icon}
                        className="w-16"
                    />
                    <h3 className="text-5xl text-gray-600 font-medium text-center">Oops! Something went wrong. Try refreshing.</h3>
                </main>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundry;