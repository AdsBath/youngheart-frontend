import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AgeSelector = ({ ages, selectedAge, setAge }: any) => (
  <div>
    {selectedAge.toLowerCase() !== "default" && (
      <>
        <span className="text-sm font-semibold mb-2">Age:</span>
        <Select onValueChange={(value) => setAge(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ages?.map((ageItem: any, index: number) => (
                <SelectItem value={ageItem} key={ageItem}>
                  {ageItem}
                </SelectItem>
                // <Button
                //   key={index}
                //   size="sm"
                //   onClick={() => setAge(ageItem)}
                //   disabled={ageItem?.quantity === "0"}
                //   variant={ageItem === selectedAge ? "select" : "selectOutline"}
                //   className="h-6 text-[12px]"
                // >
                //   {ageItem}
                // </Button>
              ))}

              {/* <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-3"></div>
      </>
    )}
  </div>
);
