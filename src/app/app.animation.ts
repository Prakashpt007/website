import {
	trigger,
	animate,
	transition,
	style,
	group,
	query,
	AnimationTriggerMetadata,
	sequence,
} from "@angular/animations";

export const slideInAnimation = trigger("slideInAnimation", [
	transition("* <=> *", [
		query(
			":enter, :leave",
			style({
				position: "absolute",
				width: "100%",
				zIndex: 2,
			}),
			{optional: true}
		),
		group([
			query(
				":enter",
				[
					style({transform: "translateX(3.125rem)", opacity: 0}),
					animate(
						"0.5s ease-out",
						style({transform: "translateX(0)", opacity: 1})
					),
				],
				{optional: true}
			),
			query(
				":leave",
				[
					style({transform: "translateX(0)"}),
					animate(
						"0.5s ease-out",
						style({transform: "translateX(-3.125rem)", opacity: 0})
					),
				],
				{optional: true}
			),
		]),
	]),
]);

export const slideUpAnimation = trigger("slideUpAnimation", [
	transition("* <=> *", [
		query(
			":enter, :leave",
			style({
				position: "absolute",
				width: "100%",
				zIndex: 2,
			}),
			{optional: true}
		),
		group([
			query(
				":enter",
				[
					style({transform: "translateY(1.25rem)", opacity: 0}),
					animate(
						"0.3s ease-out",
						style({transform: "translateY(0)", opacity: 1})
					),
				],
				{optional: true}
			),
			query(
				":leave",
				[
					style({transform: "translateY(0)", opacity: 1}),
					animate(
						"0.3s ease-out",
						style({transform: "translateY(-1.25rem)", opacity: 0})
					),
				],
				{optional: true}
			),
		]),
	]),
]);

export const fadeSlideUp = trigger("fadeSlideUp", [
	transition("* <=> *", [
		query(
			":enter, :leave",
			style({
				position: "absolute",
				width: "100%",
				zIndex: 2,
			}),
			{optional: true}
		),
		group([
			query(
				":enter",
				[
					style({transform: "translateY(100%)", opacity: 0}),
					// animate(
					//   "0.5s ease",
					//   style({ transform: "translateY(0)", opacity: 1 })
					// ),
					sequence([
						animate('0.5s 0s ease', style({transform: 'translateY(0)', opacity: 1})),
					]),
				],
				{optional: true}
			),
			query(
				":leave",
				[
					style({transform: "translateY(0)", opacity: 1}),
					animate(
						"0.5s ease",
						style({transform: "translateY(-100%)", opacity: 0})
					),
				],
				{optional: true}
			),
		]),

		// group([
		//   query(
		//     ":enter",
		//     [
		//       style({ transform: "translateY(100%)", opacity: 0 }),
		//       // animate(
		//       //   "0.5s ease",
		//       //   style({ transform: "translateX(0)", opacity: 1 })
		//       // ),
		//       sequence([
		//         animate('0.5s ease', style({ transform: 'translateY(0)', opacity: 1 })),
		//       ]),

		//     ],

		//     { optional: true }
		//   ),
		//   query(
		//     ":leave",
		//     [
		//       style({ transform: "translateY(0)", opacity: 1 }),
		//       animate(
		//         "0.5s ease",
		//         style({ transform: "translateY(-100%)", opacity: 0 })
		//       ),
		//     ],
		//     { optional: true }
		//   ),
		// ]),
	]),
]);

export function FadeIn (
	timingIn: number,
	height: boolean = false
): AnimationTriggerMetadata {
	return trigger("fadeIn", [
		transition(":enter", [
			style(height ? {opacity: 0, height: 0} : {opacity: 0}),
			animate(
				timingIn,
				style(height ? {opacity: 1, height: "fit-content"} : {opacity: 1})
			),
		]),
	]);
}
export function FadeInOut (
	timingIn: number,
	timingOut: number,
	height: boolean = false
): AnimationTriggerMetadata {
	return trigger("fadeInOut", [
		transition(":enter", [
			style(height ? {opacity: 0, height: 0} : {opacity: 0}),
			animate(
				timingIn,
				style(height ? {opacity: 1, height: "fit-content"} : {opacity: 1})
			),
		]),
		transition(":leave", [
			animate(
				timingOut,
				style(height ? {opacity: 0, height: 0} : {opacity: 0})
			),
		]),
	]);
}
