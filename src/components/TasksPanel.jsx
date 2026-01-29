export default function TasksPanel() {
return (
<Card title="Your Tasks">
<Task text="Check-in at Bayou High School" />
<Task text="Assist with road clearance" />
</Card>
);
}


function Task({ text }) {
return (
<div className="flex items-center gap-2 bg-slate-700 p-2 rounded mb-2">
<input type="checkbox" />
<span>{text}</span>
</div>
);
}


function Card({ title, children }) {
return (
<div className="bg-slate-800 rounded-xl p-4 shadow">
<h2 className="font-semibold mb-2">{title}</h2>
{children}
</div>
);
}