import type { ModuleKey, ModuleOption } from "../types/report-builder";

type ReportTypeSelectorProps = {
    moduleOptions: ModuleOption[];
    selectedModule: ModuleKey;
    onModuleChange: (module: ModuleKey) => void;
};

export default function ReportTypeSelector({
    moduleOptions,
    selectedModule,
    onModuleChange,
}: ReportTypeSelectorProps) {
    return (
        <div className="rounded-lg border p-4">
            <p className="mb-3 text-sm font-medium">Report Type</p>
            <div className="grid gap-2 sm:grid-cols-2">
                {moduleOptions.map((moduleOption) => {
                    const Icon = moduleOption.icon;
                    const isSelected = selectedModule === moduleOption.value;

                    return (
                        <button
                            key={moduleOption.value}
                            type="button"
                            onClick={() => onModuleChange(moduleOption.value)}
                            className={[
                                "flex w-full items-start gap-3 rounded-md border p-3 text-left transition",
                                isSelected
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:bg-muted/50",
                            ].join(" ")}
                        >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <span>
                                <span className="block text-sm font-semibold">{moduleOption.label}</span>
                                <span className="block text-xs text-muted-foreground">
                                    {moduleOption.description}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
