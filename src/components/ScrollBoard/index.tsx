import {
	useEffect,
	useState,
	useRef,
	useMemo,
	forwardRef,
	ComponentProps
} from 'react';

import classnames from 'classnames';

import './style.less';
import { cloneDeep, merge, uniqBy } from 'lodash-es';
import useAutoResize from '@/hooks/useAutoResize';
import { co } from '@/utils/dom';

const defaultConfig = {
	/**
	 * @description Board header
	 * @type {Array<String>}
	 * @default header = []
	 * @example header = ['column1', 'column2', 'column3']
	 */
	header: [],
	/**
	 * @description Board data
	 * @type {Array<Array>}
	 * @default data = []
	 */
	data: [],
	/**
	 * @description Row num
	 * @type {Number}
	 * @default rowNum = 5
	 */
	rowNum: 5,
	/**
	 * @description Header background color
	 * @type {String}
	 * @default headerBGC = '#00BAFF'
	 */
	headerBGC: '#00BAFF',
	/**
	 * @description Odd row background color
	 * @type {String}
	 * @default oddRowBGC = '#003B51'
	 */
	oddRowBGC: '#003B51',
	/**
	 * @description Even row background color
	 * @type {String}
	 * @default evenRowBGC = '#003B51'
	 */
	evenRowBGC: '#0A2732',
	/**
	 * @description Scroll wait time
	 * @type {Number}
	 * @default waitTime = 2000
	 */
	waitTime: 2000,
	/**
	 * @description Header height
	 * @type {Number}
	 * @default headerHeight = 35
	 */
	headerHeight: 35,
	/**
	 * @description Column width
	 * @type {Array<Number>}
	 * @default columnWidth = []
	 */
	columnWidth: [],
	/**
	 * @description Column align
	 * @type {Array<String>}
	 * @default align = []
	 * @example align = ['left', 'center', 'right']
	 */
	align: [],
	/**
	 * @description Show index
	 * @type {Boolean}
	 * @default index = false
	 */
	index: false,
	/**
	 * @description index Header
	 * @type {String}
	 * @default indexHeader = '#'
	 */
	indexHeader: '#',
	/**
	 * @description Carousel type
	 * @type {String}
	 * @default carousel = 'single'
	 * @example carousel = 'single' | 'page'
	 */
	carousel: 'single',
	/**
	 * @description Pause scroll when mouse hovered
	 * @type {Boolean}
	 * @default hoverPause = true
	 * @example hoverPause = true | false
	 */
	hoverPause: true
};

function calcHeaderData({ header, index, indexHeader }) {
	if (!header.length) {
		return [];
	}

	header = [...header];

	if (index) header.unshift(indexHeader);

	return header;
}

function calcRows({ data, index, headerBGC, rowNum }) {
	if (index) {
		data = data.map((row, i) => {
			row = [...row];

			const indexTag = `<span class="index" style="background-color: ${headerBGC};">${
				i + 1
			}</span>`;

			row.unshift(indexTag);

			return row;
		});
	}

	data = data.map((ceils, i) => ({ ceils, rowIndex: i }));

	const rowLength = data.length;

	if (rowLength > rowNum && rowLength < 2 * rowNum) {
		data = [...data, ...data];
	}

	return data.map((d, i) => ({ ...d, scroll: i }));
}

function calcAligns(mergedConfig, header) {
	const columnNum = header.length;

	let aligns = new Array(columnNum).fill('left');

	const { align } = mergedConfig;

	return merge(aligns, align);
}

const ScrollBoard = forwardRef(
	(
		{
			onCellClick,
			config = {},
			className,
			style,
			onMouseOver,
			renderRow,
			...rest
		}: ScrollBoardProps,
		ref
	) => {
		const [isPause, setIsPause] = useState(false);
		const { width, height, domRef } = useAutoResize(ref);

		const [state, setState] = useState({
			mergedConfig: null,

			header: [],

			rows: [],

			widths: [],

			heights: [],

			aligns: []
		});

		const { mergedConfig, header, rows, widths, heights, aligns } = state;

		const stateRef = useRef({
			...state,
			rowsData: [],
			avgHeight: 0,
			animationIndex: 0
		});

		Object.assign(stateRef.current, state);

		function onResize() {
			if (!mergedConfig) return;

			const widths = calcWidths(mergedConfig, stateRef.current.rowsData);

			const heights = calcHeights(mergedConfig, header);

			const data = { widths, heights };

			Object.assign(stateRef.current, data);
			setState(state => ({ ...state, ...data }));
		}

		function calcData() {
			const mergedConfig = merge(cloneDeep(defaultConfig), config || {});

			const header = calcHeaderData(mergedConfig);

			const rows = calcRows(mergedConfig);

			const widths = calcWidths(mergedConfig, stateRef.current.rowsData);

			const heights = calcHeights(mergedConfig, header);

			const aligns = calcAligns(mergedConfig, header);

			const data = {
				mergedConfig,
				header,
				rows,
				widths,
				aligns,
				heights
			};

			Object.assign(stateRef.current, data, {
				rowsData: rows,
				animationIndex: 0
			});

			setState(state => ({ ...state, ...data }));
		}

		function calcWidths({ columnWidth, header }, rowsData) {
			const usedWidth = columnWidth.reduce((all, w) => all + w, 0);

			let columnNum = 0;
			if (rowsData[0]) {
				columnNum = rowsData[0].ceils.length;
			} else if (header.length) {
				columnNum = header.length;
			}

			const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length);

			const widths = new Array(columnNum).fill(avgWidth);

			return merge(widths, columnWidth);
		}

		function calcHeights({ headerHeight, rowNum, data }, header) {
			let allHeight = height;

			if (header.length) allHeight -= headerHeight;

			const avgHeight = allHeight / rowNum;

			Object.assign(stateRef.current, { avgHeight });

			return new Array(data.length).fill(avgHeight);
		}

		function* animation(start = false) {
			setIsPause(false);
			let {
				avgHeight,
				animationIndex,
				mergedConfig: { waitTime, carousel, rowNum },
				rowsData
			} = stateRef.current;

			const rowLength = rowsData.length;

			if (start) yield new Promise(resolve => setTimeout(resolve, waitTime));

			const animationNum = carousel === 'single' ? 1 : rowNum;

			let rows = rowsData.slice(animationIndex);
			rows.push(...rowsData.slice(0, animationIndex));
			rows = rows.slice(0, carousel === 'page' ? rowNum * 2 : rowNum + 1);

			const heights = new Array(rowLength).fill(avgHeight);
			setState(state => ({ ...state, rows, heights }));

			yield new Promise(resolve => setTimeout(resolve, 300));

			animationIndex += animationNum;

			const back = animationIndex - rowLength;
			if (back >= 0) animationIndex = back;

			const newHeights = [...heights];
			newHeights.splice(0, animationNum, ...new Array(animationNum).fill(0));

			Object.assign(stateRef.current, { animationIndex });
			setState(state => ({ ...state, heights: newHeights }));
		}

		function emitEvent(handle, ri, ci, row, ceil) {
			const { ceils, rowIndex } = row;

			handle && handle({ row: ceils, ceil, rowIndex, columnIndex: ci });
		}

		function handleHover(enter, ri, ci, row, ceil) {
			if (enter) emitEvent(onMouseOver, ri, ci, row, ceil);

			if (!mergedConfig.hoverPause) return;

			const { pause, resume } = task.current;

			enter && pause && resume
				? pause()
				: (function () {
						if (resume) resume();
				  })();
			setIsPause(true);

			setState(state => ({
				...state,
				rows: [...uniqBy(stateRef.current.rowsData, 'rowIndex')]
			}));
		}

		const getBackgroundColor = rowIndex =>
			mergedConfig[rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC'];

		const task = useRef<Recordable>({});

		useEffect(() => {
			calcData();

			let start = true;

			function* loop() {
				while (true) {
					yield* animation(start);

					start = false;

					const { waitTime } = stateRef.current.mergedConfig;

					yield new Promise(resolve => setTimeout(resolve, waitTime - 300));
				}
			}

			const {
				mergedConfig: { rowNum },
				rows: rowsData
			} = stateRef.current;

			const rowLength = rowsData.length;

			if (rowNum >= rowLength) return;

			task.current = co(loop);

			return task.current.end;
		}, [config, domRef.current]);

		useEffect(onResize, [width, height, domRef.current]);

		const classNames = useMemo(
			() => classnames('dv-scroll-board', className),
			[className]
		);

		function getRowNode(row: Recordable, ri: number) {
			return (
				<div
					className='row-item'
					key={`${row.toString()}-${row.scroll}`}
					style={{
						height: isPause ? '43px' : `${heights[ri]}px`,
						lineHeight: isPause ? '43px' : `${heights[ri]}px`,
						backgroundColor: `${getBackgroundColor(row.rowIndex)}`
					}}
				>
					{row.ceils.map((ceil, ci) => (
						<div
							className='ceil'
							key={`${ceil}-${ri}-${ci}`}
							style={{ width: `${widths[ci]}px`, textAlign: aligns[ci] }}
							dangerouslySetInnerHTML={{ __html: ceil }}
							onClick={() => emitEvent(onCellClick, ri, ci, row, ceil)}
							onMouseEnter={() => handleHover(true, ri, ci, row, ceil)}
							onMouseLeave={() => handleHover(false, ri, ci, row, ceil)}
						/>
					))}
				</div>
			);
		}
		return (
			<div className={classNames} style={style} ref={domRef} {...rest}>
				{!!header.length && !!mergedConfig && (
					<div
						className='header'
						style={{ backgroundColor: `${mergedConfig.headerBGC}` }}
					>
						{header.map((headerItem, i) => (
							<div
								className='header-item'
								key={`${headerItem}-${i}`}
								style={{
									height: `${mergedConfig.headerHeight}px`,
									lineHeight: `${mergedConfig.headerHeight}px`,
									width: `${widths[i]}px`,
									textAlign: aligns[i]
								}}
								dangerouslySetInnerHTML={{ __html: headerItem }}
							/>
						))}
					</div>
				)}

				{!!mergedConfig && (
					<div
						className='rows'
						style={{
							height: `${
								height - (header.length ? mergedConfig.headerHeight : 0)
							}px`,
							overflowY: isPause ? 'auto' : 'hidden'
							// overflowY: 'hidden'
						}}
					>
						{rows.map((row, ri) =>
							renderRow
								? renderRow(getRowNode(row, ri), ri, row)
								: getRowNode(row, ri)
						)}
					</div>
				)}
			</div>
		);
	}
);

export type ScrollBoardProps = ComponentProps<'div'> & {
	config: Recordable;
	onMouseOver?: (event: Recordable) => void;
	onCellClick?: (event: Recordable) => void;
	renderRow?: (
		originalNode: React.ReactNode,
		rowIndex: number,
		rowData: Recordable
	) => React.ReactNode;
};

export default ScrollBoard;
