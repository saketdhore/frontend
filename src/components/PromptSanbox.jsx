import { useState, useRef } from 'react';
import { sendScorePrompt } from '../api/api';

const PromptSandbox = () => {
    const [promptInput, setPromptInput] = useState("");
    const [messages, setMessages] = useState([]);
    const editableRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = () => {
        setPromptInput(editableRef.current.textContent);
    };

    const handleSubmit = (score = null) => {
        if (!promptInput.trim()) return;
        setMessages((prev) => [...prev, { text: promptInput, score }]);
        setPromptInput("");
        editableRef.current.textContent = '';
    };

    const handleScorePrompt = async () => {
        try {
            setLoading(true);
            const scoredData = await sendScorePrompt(promptInput);
            console.log("API Response:", scoredData.generated_data.score);
            const score = scoredData?.generated_data?.score || 0;
            handleSubmit(score);
        } catch (err) {
            console.error("Error scoring prompt:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && event.ctrlKey && event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }

        if (event.ctrlKey && event.key === '/') {
            event.preventDefault();
            await handleScorePrompt();
        }
    };

    return (
        <div className="flex flex-col w-2/3 p-2 gap-2 border-2 border-amber-950">
            <div className="flex flex-col gap-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className="self-end bg-blue-100 px-4 py-2 rounded-xl max-w-8/12 whitespace-pre-wrap break-words flex flex-col gap-1">
                        <span>{msg.text}</span>
                        {msg.score !== null && (
                            <div className="flex flex-col gap-1">
                                <span className="text-lg text-gray-500">Prompt Score: {msg.score}</span>
                                <progress
                                    className={`progress w-56 ${
                                        msg.score <= 35
                                            ? 'progress-error'
                                            : msg.score <= 80
                                            ? 'progress-warning'
                                            : 'progress-success'
                                    }`}
                                    value={msg.score}
                                    max="100"
                                ></progress>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-0.5 w-full relative pl-2">
                {promptInput === "" && (
                    <p className="absolute text-gray-400 pointer-events-none select-none text-xl">
                        Type your prompt...
                    </p>
                )}
                <div
                    ref={editableRef}
                    className="w-full text-gray-800 outline-none whitespace-pre-wrap focus:ring-0 min-h-[1.5rem]"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <p className="text-sm text-gray-400 mt-1">Press Ctrl + Shift + Enter to submit</p>
                <p className="text-sm text-gray-400">Press Ctrl + / to see prompt rating</p>
                {loading && <p className="text-sm text-gray-500">Scoring...</p>}
            </div>
        </div>
    );
};

export default PromptSandbox;
