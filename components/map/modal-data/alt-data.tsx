import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";

type Props = {
    data: any;
};

export default function AltData({ data }: Props) {
    return (
        <div className="flex flex-col gap-3 p-2">
            <Table
                isHeaderSticky
                classNames={{
                    base: "max-h-[200px]",
                }}
            >
                <TableHeader>
                    <TableColumn className="text-right">Date</TableColumn>
                    <TableColumn className="text-right">Severity</TableColumn>
                    <TableColumn className="text-right">Description</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.data.map((elem: any) => {
                        const servicePriority=elem.servicePriority;
                        let admStateCss="";
                        switch (servicePriority) {
                            case "C":
                                admStateCss="text-red-600 font-bold";
                                break;
                            case "M":
                                admStateCss="text-orange-600 font-bold";
                                break;
                            case "m":
                                admStateCss="text-yellow-600 font-bold";
                                break;
                            case "w":
                                admStateCss="text-blue-600 font-bold";
                                break;
                            default:
                                break;
                        }
                        return (
                            <TableRow
                                key={elem.sector}
                                className="rounded-full"
                            >
                                <TableCell className="font-bold">{elem.date}</TableCell>
                                <TableCell className={admStateCss}>{elem.servicePriority}</TableCell>
                                <TableCell className="text-left">{elem.description}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
