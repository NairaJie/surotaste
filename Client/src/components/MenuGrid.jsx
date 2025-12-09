export default function MenuGrid({ menuItems, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="bg-[var(--cream)] rounded-2xl shadow-md overflow-hidden 
          hover:-translate-y-2 hover:shadow-xl hover:bg-[#fff5ea] transition-all duration-300 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          <img
            src={item.image}
            className="w-full h-48 object-cover"
            alt={item.name}
          />
          <div className="p-4">
            <h3 className="text-green-700 font-semibold">{item.name}</h3>
            <p className="text-[var(--orange)] font-bold">
              Rp{Number(item.price).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
