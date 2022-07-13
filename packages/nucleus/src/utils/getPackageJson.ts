interface Options {
	monorepo: boolean;
	name: string;
	repository: string;
}

interface PackageJson {
	publishConfig: {
		access: string;
		directory: string;
	};
	name: string;
	version: string;
	repository: string | {
		type: 'git';
		url: string;
		directory: string;
	};
	scripts: Record<string, string>;
}

export default function getPackageJson({ monorepo, name, repository }: Options): PackageJson {
	const dirName = name.replace(/^[^/]+\//u, '');

	return {
		publishConfig: {
			access: 'private',
			directory: 'dist',
		},
		name,
		version: '0.0.0',
		repository: !monorepo
			? repository
			: {
				type: 'git',
				url: repository,
				directory: `packages/${dirName}`,
			},
		scripts: {
			lint: 'nucleus lint',
			start: 'nucleus start',
			test: 'nucleus test',
		},
	};
}
