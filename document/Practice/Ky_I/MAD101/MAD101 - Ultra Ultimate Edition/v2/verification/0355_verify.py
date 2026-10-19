"""
MAD101 STUDIO — INDEPENDENT VERIFICATION SCRIPT
Question ID: 355
Topic: Graph Theory — Cut Vertices (Articulation Points)
Image: 0355_q355_Question_355.png
"""

import json
import os
import networkx as nx

def verify_question_355():
    # 1. Model Graph X (5-pointed star graph)
    # 5 vertices: v1..v5, connected as a star: (1,3), (3,5), (5,2), (2,4), (4,1)
    G_X = nx.Graph()
    G_X.add_nodes_from(["v1", "v2", "v3", "v4", "v5"])
    G_X.add_edges_from([
        ("v1", "v3"),
        ("v3", "v5"),
        ("v5", "v2"),
        ("v2", "v4"),
        ("v4", "v1")
    ])
    
    # 2. Model Graph Y (2 vertical edges connected through a central vertex)
    # 5 vertices: TL, BL, TR, BR, and Center C
    G_Y = nx.Graph()
    G_Y.add_nodes_from(["TL", "BL", "TR", "BR", "C"])
    G_Y.add_edges_from([
        ("TL", "BL"),
        ("TR", "BR"),
        ("TL", "C"),
        ("BL", "C"),
        ("TR", "C"),
        ("BR", "C")
    ])
    
    # Calculate cut vertices (articulation points) using NetworkX / Tarjan's / Hopcroft-Tarjan
    cut_vertices_X = list(nx.articulation_points(G_X))
    cut_vertices_Y = list(nx.articulation_points(G_Y))
    
    count_X = len(cut_vertices_X)
    count_Y = len(cut_vertices_Y)
    
    if count_Y > count_X:
        conclusion_answer = "C"
        explanation_conclusion = f"Đồ thị Y có {count_Y} cut vertex ('{cut_vertices_Y[0]}'), trong khi đồ thị X có {count_X} cut vertex. Vậy Y có nhiều cut vertex hơn (Đáp án C)."
    elif count_X > count_Y:
        conclusion_answer = "B"
        explanation_conclusion = f"Đồ thị X có {count_X} cut vertex, trong khi đồ thị Y có {count_Y} cut vertex. Vậy X có nhiều cut vertex hơn (Đáp án B)."
    else:
        conclusion_answer = "A"
        explanation_conclusion = f"Cả hai đồ thị đều có cùng số lượng cut vertex ({count_X}). (Đáp án A)."
        
    result = {
        "id": 355,
        "method": "graph_theory_articulation_points_networkx",
        "input": {
            "graph_X": {
                "nodes": list(G_X.nodes()),
                "edges": list(G_X.edges())
            },
            "graph_Y": {
                "nodes": list(G_Y.nodes()),
                "edges": list(G_Y.edges())
            }
        },
        "output": {
            "cut_vertices_X": cut_vertices_X,
            "cut_count_X": count_X,
            "cut_vertices_Y": cut_vertices_Y,
            "cut_count_Y": count_Y,
            "is_isomorphic_to_C5_X": nx.is_isomorphic(G_X, nx.cycle_graph(5))
        },
        "calculated_answer": conclusion_answer,
        "expected_answer": "C",
        "match": conclusion_answer == "C",
        "conclusion": explanation_conclusion
    }
    
    out_path = os.path.join(os.path.dirname(__file__), "0355_results.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        
    print(f"Verified Question 355: Answer = {conclusion_answer} (Match: {conclusion_answer == 'C'})")
    print(explanation_conclusion)
    return result

if __name__ == "__main__":
    verify_question_355()
