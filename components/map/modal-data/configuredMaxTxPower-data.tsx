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

export default function ConfiguredMaxTxPowerData({ data }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <Table>
                <TableHeader>
                    <TableColumn className="text-right">sector</TableColumn>
                    <TableColumn className="text-right">value</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.data.map((elem: any) => {
                        return (
                            <TableRow
                                key={elem.sector}
                                className="font-heeborounded-full"
                            >
                                <TableCell className="font-bold">{elem.sector}</TableCell>
                                <TableCell className="font-bold">{elem.value}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
