import { getImgUrl } from "../common/utils";

export default function OrderedItem({
  category,
  product_name,
  brand,
  price,
  qty,
}) {
  return (
    <tr className="">
      <td className="flex gap-2 border-[1px] p-1 pl-2">
        <img
          src={getImgUrl(category.toLowerCase())}
          alt=""
          className="h-[50px] w-[40px] object-cover"
        />
        <div>
          <h3 className="text-sm font-bold capitalize">{product_name}</h3>
          <small className="text-xs text-gray-500">{brand}</small>
        </div>
      </td>
      <td className="border-[1px] p-1 pl-2">{qty}</td>
      <td className="border-[1px] p-1 pl-2">₹{price}</td>
    </tr>
  );
}
