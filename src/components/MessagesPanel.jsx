export default function MessagesPanel() {
return (
<div className="bg-slate-800 rounded-xl p-4 shadow">
<h2 className="font-semibold mb-2">Messages</h2>
<div className="text-sm text-gray-400 mb-2">Officer Gray: Situation under control</div>
<input
placeholder="Type a message..."
className="w-full bg-slate-700 p-2 rounded outline-none"
/>
</div>
);
}