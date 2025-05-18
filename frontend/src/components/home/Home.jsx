function Home() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-2xl w-full bg-white/90 rounded-xl shadow-lg p-10 text-center border border-blue-100">
                <h2 className="text-4xl font-extrabold mb-4 text-blue-700 tracking-tight">
                    Welcome to <span className="text-blue-500">DevLogged!</span>
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                    A modern blog platform for developers to share posts about
                    tech, coding, and software development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <a
                        href="/register"
                        className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                    >
                        Get Started
                    </a>
                    <a
                        href="/login"
                        className="px-6 py-2 rounded border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
