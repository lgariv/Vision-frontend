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

export default function InvxrfData({ data }: Props) {
    return (
        <div className="flex flex-col gap-3 p-2">
            <Table
                isHeaderSticky
                classNames={{
                    base: "max-h-[200px]",
                }}
            >
                <TableHeader>
                    <TableColumn className="text-right">board</TableColumn>
                    <TableColumn className="text-right">cells</TableColumn>
                    <TableColumn className="text-right">pci</TableColumn>
                    <TableColumn className="text-right">vswr</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.data.map((elem: any) => {
                        return (
                            <TableRow
                                key={elem.sector}
                                className="font-heeborounded-full"
                            >
                                <TableCell className="font-bold">{elem.board}</TableCell>
                                <TableCell className="font-bold">{elem.cells}</TableCell>
                                <TableCell className="font-bold">{elem.pci}</TableCell>
                                <TableCell className="font-bold">{elem.vswr}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
