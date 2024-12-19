import React from "react";
import { CircularProgress } from "@nextui-org/react";

type Props = {
    data: any;
};

export default function RRData({ data }: Props) {
    return (
		<div className="flex justify-center gap-3 p-2">
			<div className="grid grid-cols-3 gap-x-12 gap-y-4">
				{data.data.map((elem: any) => {
					return (
						<CircularProgress
							key={elem.sector}
							size="lg"
							value={Math.abs(elem.value)} // Calculate the absolute value
							color={
								// TODO: make it dynamic
								Math.abs(elem.value) <= 110
									? Math.abs(elem.value) <= 100
										? "danger"
										: "warning"
									: "success"
							}
							maxValue={125}
							minValue={80}
							formatOptions={{}}
							label={`סקטור ${elem.sector}`}
							showValueLabel={Math.abs(elem.value) > 0}
						/>
					);
				})}
			</div>
		</div>
	);
}
